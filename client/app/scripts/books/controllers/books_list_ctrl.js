'use strict';

define(['app', 'firebase'], function(App, Firebase) {
  App.controller('BooksListCtrl', function ($scope, $location, angularFireCollection) {
    $scope.books = angularFireCollection(new Firebase('https://nulogy-books.firebaseio.com/books'));
  });
});
