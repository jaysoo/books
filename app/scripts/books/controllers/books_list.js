'use strict';

define(['books/app'], function(App) {
  App.controller('BooksListCtrl', function ($scope) {
    $scope.books = [
      {
        title: 'Blah'
      }
    ];
  });
});
