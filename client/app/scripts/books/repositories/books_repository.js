'use strict';

define(['lodash', 'app'], function(_, App) {
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

      Object.defineProperties(Book.prototype, {
        'id': {
          get: function() {
            return this._id;
          }
        }
      });

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
        },

        remove: function(book) {
          return book.$remove();
        }
      };
    }
  ]);
});

