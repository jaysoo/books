'use strict';

define(['lodash', 'app'], function(_, App) {
  App.factory('BooksRepository', ['$http', function($http) {
    var url = '/books';

    return {
      list: function() {
        $http.get(url);
      },

      create: function(book) {
        $http.post(url, book);
      }
    };
  }]);
});


