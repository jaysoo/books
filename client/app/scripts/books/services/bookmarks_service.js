'use strict';

define([
  'lodash',
  'app',
  'firebase',

  'common/helpers/firebase'

], function(_, App, Firebase) {
  App.factory('BookmarksService', ['$q', BookmarksService]);

  function BookmarksService($q) {
    var usersRef = new Firebase('https://nulogy-books.firebaseio.com/users');

    function bookmarksRef(user) {
      return usersRef.child(user.id).child('bookmarks');
    }

    return {
      isBookmarked: function(user, book) {
        var deferred = $q.defer();

        bookmarksRef(user).child(book.$ref.name()).once('value', function(snapshot) {
          deferred.resolve(snapshot.val());
        });

        return deferred.promise;
      },

      add: function(user, book) {
        bookmarksRef(user).child(book.$ref.name()).set(true);
      },

      remove: function(user, book) {
        bookmarksRef(user).child(book.$ref.name()).set(false);
      }
    };
  }

  return BookmarksService;
});
