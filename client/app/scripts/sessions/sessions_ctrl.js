'use strict';

define(['lodash', 'app', 'firebase'], function(_, App, Firebase) {
  App.controller('SessionsCtrl', ['$scope', '$modal', 'SessionsRepository', 'VotesRepository', 'BooksRepository', 'SecurityService',
    function($scope, $modal, SessionsRepository, VotesRepository, BooksRepository, SecurityService) {
      $scope.mode = 'show';

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
        var modalInstance = $modal.open({
          templateUrl: 'partials/sessions/add_session_confirmation.html',
          controller: StartSessionConfirmationCtrl,
          resolve: {
            items: function () {
              return $scope.items;
            }
          }
        });

        modalInstance.result.then(function () {
          SessionsRepository.create().then(function() {
            fetchSessions().then(function() {
              $scope.mode = 'edit';
            });
          });
        });
      };

      $scope.$watch('currentSession', function(currentSession) {
        fetchVotesFor(currentSession);
      });

      $scope.$watch('currentSession.voting_enabled', function(newValue, oldValue) {
        if (!$scope.currentSession || undefined === oldValue) {
          return;
        }

        if (newValue) {
          $scope.currentSession.$enableVoting();
        } else {
          $scope.currentSession.$disableVoting();
        }
      });

      $scope.$watch('currentSession.book_id', function(bookId) {
        updateReading($scope.books, bookId);
      });

      $scope.$watch('books', function(books) {
        if ($scope.currentSession) {
          updateReading(books, $scope.currentSession.book_id);
        }
      });

      $scope.voteFor = function(session, book, user) {
        VotesRepository.add(session, book, user);
        onVote(book);
      };

      $scope.removeVoteFor = function(session, book, user) {
        VotesRepository.remove(session, book, user);
        onUnvote(book);
      };

      $scope.showEdit = function() {
        $scope.sessionToEdit = _.clone($scope.currentSession);
        $scope.mode = 'edit';
      };

      $scope.hideEdit = function() {
        $scope.mode = 'show';
      };

      $scope.saveSession = function() {
        _.merge($scope.currentSession, $scope.sessionToEdit);
        $scope.currentSession.$update();
        $scope.mode = 'show';
      };

      fetchSessions();
      fetchBooks();

      function fetchSessions() {
        return SessionsRepository.list().then(function(sessions) {
          if (sessions.length > 0) {
            $scope.currentSession = sessions[0];
            $scope.previousSessions = _.rest(sessions);
          }
        });
      }

      function fetchVotesFor(currentSession) {
        if (!currentSession) { return; }

        return VotesRepository.list(currentSession).then(function(votes) {
          var votesByBookId = _.reduce(votes, function(votes, vote) {
            if (vote.user_id === $scope.currentUser.id) {
              $scope.voted[vote.book_id] = true;
            }

            votes[vote.book_id] = votes[vote.book_id] || [];
            votes[vote.book_id].push(vote);

            return votes;
          }, {});

          $scope.votesByBookId = votesByBookId;
        });
      }

      function fetchBooks() {
        return BooksRepository.list().then(function(books) {
          updateBooksInScope($scope, books);
        });
      }

      function onVote(book) {
        ensureBookVotes(book);
        $scope.voted[book.id] = true;

        $scope.votesByBookId[book.id].push({
          user_id: $scope.currentUser.id,
          user_image: $scope.currentUser.image,
          user_first_name: $scope.currentUser.first_name,
          user_last_name: $scope.currentUser.last_name,
          user_email: $scope.currentUser.email
        });
      }

      function onUnvote(book) {
        ensureBookVotes(book);
        $scope.voted[book.id] = false;

        $scope.votesByBookId[book.id] = _.filter($scope.votesByBookId[book.id], function(vote) {
          return vote.user_id !== $scope.currentUser.id;
        });
      }

      function ensureBookVotes(book) {
        $scope.votesByBookId[book.id] = $scope.votesByBookId[book.id] || [];
      }

      function handleVoteEvent(ev) {
        if (ev.session_id === $scope.currentSession.id && ev.user_id !== SecurityService.currentUser().id) {
          console.log('new vote', ev);
        }
      }

      function updateBooksInScope(scope, books) {
        scope.books = books;
        scope.booksById = booksById(books);
      }

      function booksById(books) {
        return _.chain(books)
                .map(function(book) { return [book.id, book]; })
                .zipObject()
                .value();
      }

      function updateReading(books, bookId) {
        if (!books || !bookId) {
          return;
        }

        var book = _.find(books, function(b) { return b.id === bookId; });
        $scope.reading = book;
      }
    }
  ]);

  function StartSessionConfirmationCtrl($scope, $modalInstance) {
    $scope.ok = function () {
      $modalInstance.close();
    };

    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };
  }
});
