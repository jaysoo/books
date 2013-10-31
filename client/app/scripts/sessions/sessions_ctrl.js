'use strict';

define(['lodash', 'app', 'firebase'], function(_, App, Firebase) {
  App.controller('SessionsCtrl', ['$scope', 'SessionsRepository', 'VotesRepository', 'BooksRepository', 'SecurityService',
    function($scope, SessionsRepository, VotesRepository, BooksRepository, SecurityService) {
      var votesRef = new Firebase('https://nulogy-books.firebaseio.com/votes');
      var lastEventName = sessionStorage.getItem('events:votes:last');

      if (lastEventName) {
        votesRef = votesRef.startAt(lastEventName);
      }

      votesRef.on('child_added', function(snap) {
        var name = snap.name();
        var ev = snap.val();
        sessionStorage.setItem('events:votes:last', name);
        handleVoteEvent(ev);
      });

      $scope.voted = {};

      $scope.addSession = function() {
        SessionsRepository.create().then(fetchSessions);
      };

      $scope.$watch('currentSession', function(currentSession) {
        fetchVotesFor(currentSession);
      });

      $scope.voteFor = function(session, book, user) {
        VotesRepository.add(session, book, user);
        onVote(book);
      };

      $scope.removeVoteFor = function(session, book, user) {
        VotesRepository.remove(session, book, user);
        onUnvote(book);
      };

      fetchSessions();
      fetchBooks();

      function fetchSessions() {
        SessionsRepository.list().then(function(sessions) {
          if (sessions.length > 0) {
            $scope.currentSession = sessions[0];
            $scope.previousSessions = _.rest(sessions);
          }
        });
      }

      function fetchVotesFor(currentSession) {
        if (!currentSession) { return; }

        VotesRepository.list(currentSession).then(function(votes) {
          var votesByBookId = _.reduce(votes, function(votes, vote) {
            if (vote.user_id === $scope.currentUser.id) {
              $scope.voted[vote.book_id] = true;
            }

            votes[vote.book_id] = votes[vote.book_id] || 0;
            votes[vote.book_id]++;

            return votes;
          }, {});

          $scope.votesByBookId = votesByBookId;
        });
      }

      function fetchBooks() {
        BooksRepository.list().then(function(books) {
          $scope.books = books;
        });
      }

      function onVote(book) {
        ensureBookCount(book);
        $scope.voted[book.id] = true;
        $scope.votesByBookId[book.id]++;
      }

      function onUnvote(book) {
        ensureBookCount(book);
        $scope.voted[book.id] = false;
        $scope.votesByBookId[book.id]--;
      }

      function ensureBookCount(book) {
        $scope.votesByBookId[book.id] = $scope.votesByBookId[book.id] || 0;
      }

      function handleVoteEvent(ev) {
        if (ev.session_id === $scope.currentSession.id && ev.user_id !== SecurityService.currentUser().id) {
          console.log('new vote', ev);
        }
      }
    }
  ]);
});
