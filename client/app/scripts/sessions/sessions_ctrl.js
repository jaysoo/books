'use strict';

define(['lodash', 'app', 'firebase'], function(_, App, Firebase) {
  App.controller('SessionsCtrl', ['$scope', 'SessionsRepository', 'VotesRepository',
    function($scope, SessionsRepository, VotesRepository) {

      $scope.addSession = function() {
        SessionsRepository.create().then(fetchSessions);
      };

      $scope.$watch('currentSession', function(currentSession) {
        fetchVotesFor(currentSession);
      });

      fetchSessions();

      function fetchSessions() {
        SessionsRepository.list().then(function(sessions) {
          if (sessions.length > 0) {
            $scope.currentSession = sessions[0];
            $scope.previousSessions = _.rest(sessions);
          }
        });
      }

      function fetchVotesFor(currentSession) {
        console.log('fetching votes', currentSession);
        if (currentSession) {
          VotesRepository.list($scope.currentSession).then(function(votes) {
            console.log(votes);
          });
        }
      }
    }
  ]);
});
