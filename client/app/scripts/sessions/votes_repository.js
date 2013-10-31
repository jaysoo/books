'use strict';

define(['lodash', 'app'], function(_, App) {
  App.factory('VotesRepository', ['$resource', '$q',
    function ($resource, $q) {
      var Vote = $resource('/sessions/:session_id/votes/:book_id/:user_id', {
        session_id: '@session_id',
        user_id: '@user_id',
        book_id: '@book_id'
      }, {
        add: { method: 'PUT' }
      });

      Object.defineProperties(Vote.prototype, {
        'id': {
          get: function() {
            return this._id;
          }
        }
      });

      return {
        list: function(session) {
          var deferred = $q.defer();

          Vote.query({
            session_id: session.id

          }, function(votes) {
            deferred.resolve(votes);
          });

          return deferred.promise;
        },

        add: function(session, book, user) {
          var deferred = $q.defer();

          var vote = new Vote({
            session_id: session.id,
            book_id: book.id,
            user_id: user.id
          });

          vote.$add(function() {
            deferred.resolve(vote);
          });

          return deferred.promise;
        },

        remove: function(session, book, user) {
          var deferred = $q.defer();

          Vote.remove({
            session_id: session.id,
            book_id: book.id,
            user_id: user.id
          }, function() {
            deferred.resolve();
          });

          return deferred.promise;
        }
      };
    }
  ]);
});

