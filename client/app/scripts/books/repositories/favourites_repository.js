'use strict';

define(['lodash', 'app'], function(_, App) {
  App.factory('FavouritesRepository', ['$resource', '$q',
    function ($resource, $q) {
      var Favourite = $resource('/favourites/:user_id/:book_id', {
        user_id: '@user_id',
        book_id: '@book_id'
      }, {
        add: { method: 'PUT' }
      });

      Object.defineProperties(Favourite.prototype, {
        'id': {
          get: function() {
            return this._id;
          }
        }
      });

      return {
        list: function() {
          var deferred = $q.defer();
          Favourite.query(function(favs) {
            deferred.resolve(favs);
          });
          return deferred.promise;
        },

        add: function(user, book) {
          var deferred = $q.defer();

          var fav = new Favourite({
            user_id: user.id,
            book_id: book.id
          });

          fav.$add(function() {
            deferred.resolve(fav);
          });

          return deferred.promise;
        },

        remove: function(user, book) {
          var deferred = $q.defer();

          Favourite.remove({ user_id: user.id, book_id: book.id }, function() {
            deferred.resolve();
          });

          return deferred.promise;
        }
      };
    }
  ]);
});
