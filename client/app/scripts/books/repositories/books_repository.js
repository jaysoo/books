'use strict';

define(['lodash', 'app', 'common/helpers/object'], function(_, App, OH) {
  App.factory('BooksRepository', ['$resource', '$q',
    function($resource, $q) {
      var Book = $resource('/books/:id', {
        id: '@id'
      }, {
        find: {
          method: 'GET',
          isArray: true
        }
      });

      Book.prototype = {
        get id() { return this._id; }
      };

      return {
        list: function() {
          var deferred = $q.defer();
          Book.query(function(books) {
            deferred.resolve(books);
          });
          return deferred.promise;
        },

        find: function(bookIds) {
          var deferred = $q.defer();
          Book.find({id: bookIds.join(',')}, function(books) {
            deferred.resolve(books);
          });
          return deferred.promise;
        },

        get: function(bookId) {
          var deferred = $q.defer();

          Book.get({id: bookId}, function(book) {
            deferred.resolve(book);
          });

          return deferred.promise;
        },

        create: function(bookData) {
          var book = new Book(bookData);
          return book.$save();
        }
      };
    }
  ]);
});

