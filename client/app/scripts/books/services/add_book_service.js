'use strict';

define([
  'lodash',
  'app',
  'firebase',

  'common/helpers/firebase'

], function(_, App, Firebase, FirebaseHelpers) {
  App.factory('AddBookService', AddBookService);

  function AddBookService($q) {
    var ref = new Firebase('https://nulogy-books.firebaseio.com/books');

    return {
      add: function(book) {
        var deferred = $q.defer();
        ref.push(book, FirebaseHelpers.callbackFor(deferred));
        return deferred.promise;
      }
    };
  }

  return AddBookService;
});
