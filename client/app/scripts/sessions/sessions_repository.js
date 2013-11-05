'use strict';

define(['lodash', 'app'], function(_, App) {
  App.factory('SessionsRepository', ['$resource', '$q',
    function ($resource, $q) {
      var Session = $resource('/sessions/:id/:command', {
        id: '@id'
      }, {
        update: {
          method: 'PUT'
        },
        disableVoting: {
          method: 'PUT',
          params: {
            command: 'disable_voting'
          }
        },
        enableVoting: {
          method: 'PUT',
          params: {
            command: 'enable_voting'
          }
        }
      });

      Object.defineProperties(Session.prototype, {
        'id': {
          get: function() {
            return this._id;
          }
        }
      });

      return {
        list: function() {
          var deferred = $q.defer();
          Session.query(function(sessions) {
            deferred.resolve(sessions);
          });
          return deferred.promise;
        },

        create: function(sessionData) {
          var deferred = $q.defer();

          var session = new Session(sessionData);

          session.$save(function() {
            deferred.resolve(session);
          });

          return deferred.promise;
        },

        remove: function(session) {
          var deferred = $q.defer();

          session.$remove({id: session.id}, function() {
            deferred.resolve();
          });

          return deferred.promise;
        }
      };
    }
  ]);
});
