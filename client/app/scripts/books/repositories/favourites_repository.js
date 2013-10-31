'use strict';

define([
  'lodash',
  'app'

], function(_, App) {
  App.factory('FavouritesRepository', ['$resource', '$q',
    function ($resource, $q) {
      var Favourite = $resource('/favourites/:user_id/:book_id', {
        user_id: '@user_id',
        book_id: '@book_id'
      }, {
        add: { method: 'PUT' }
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
          var fav = new Favourite({
            user_id: user._id,
            book_id: book._id
          });

          fav.$add();
        },

        remove: function(user, book) {
          var fav = Favourite.get({
            user_id: user._id,
            book_id: book._id
          }, function() {
            fav.$remove();
          });
        }
      };
    }
  ]);
});
