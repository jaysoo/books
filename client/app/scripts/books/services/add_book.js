'use strict';

define([
  'lodash',
  'app',
  'firebase',

  'helpers/firebase'

], function(_, App, Firebase, FirebaseHelpers) {
  App.service('AddBookService', AddBookService);

  function AddBookService($q) {
    this.$q = $q;
    this.ref = new Firebase('https://nulogy-books.firebaseio.com/books');
  }

  AddBookService.prototype.add = function(book) {
    var deferred = this.$q.defer();

    this.ref.push(book, FirebaseHelpers.callbackFor(deferred));

    return deferred.promise;
  };

  return AddBookService;
});
