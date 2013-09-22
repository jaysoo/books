'use strict';

define(['app'], function(App) {
  App.controller('BooksListCtrl', function ($scope) {
    $scope.books = [
      {
        title: 'Blah'
      }
    ];
  });
});
