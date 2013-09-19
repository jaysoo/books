'use strict';

define(['books/app'], function(BooksApp) {
  BooksApp.controller('BooksListCtrl', function ($scope) {
    $scope.books = [
      {
        title: 'Blah'
      }
    ];
  });
});
