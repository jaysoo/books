'use strict';

define(['lodash', 'app'], function(_, App) {
  App.factory('BooksRepository', ['$resource', function($resource) {
    var Book = $resource('/books/:id', {
      id: '@id'
    });

    return {
      list: function() {
        return Book.query();
      },

      create: function(bookData) {
        var book = new Book(bookData);
        return book.$save();
      }
    };
  }]);
});

