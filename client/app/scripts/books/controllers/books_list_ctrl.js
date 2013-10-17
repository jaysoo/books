'use strict';

define(['app', 'firebase'], function(App, Firebase) {
  App.controller('BooksListCtrl', ['$scope', '$location', 'angularFireCollection',
    function($scope, $location, angularFireCollection) {
      $scope.books = angularFireCollection(new Firebase('https://nulogy-books.firebaseio.com/books'));

      $scope.toggleBookmark = function(book) {
        book.$ref.child('isBookmarked').set(!book.isBookmarked);
      };
    }
  ]);
});
