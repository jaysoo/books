'use strict';

define(['app', 'firebase'], function(App, Firebase) {
  App.controller('BooksListCtrl', ['$scope', 'angularFireCollection', 'BookmarksService', 'SecurityService',
    function($scope, angularFireCollection, BookmarksService, SecurityService) {
      $scope.books = angularFireCollection(new Firebase('https://nulogy-books.firebaseio.com/books'));

      $scope.$watch(function() {
        return SecurityService.currentUser();
      }, function(currentUser) {
        $scope.currentUser = currentUser;
      });

      $scope.$watch('isBookmarked', function(isBookmarked, oldValue, scope) {
        if (!$scope.currentUser.isAuthenticated() || !$scope.book) {
          return;
        }

        if (isBookmarked) {
          scope.addBookmark($scope.currentUser, $scope.book);
        } else {
          scope.removeBookmark($scope.currentUser, $scope.book);
        }
      });

      $scope.addBookmark = function(user, book) {
        if (!user.isAuthenticated()) {
          return;
        }

        book.isBookmarked = true;
        BookmarksService.add(user, book);
      };

      $scope.removeBookmark = function(user, book) {
        if (!user.isAuthenticated()) {
          return;
        }

        book.isBookmarked = false;
        BookmarksService.remove(user, book);
      };
    }
  ]);
});
