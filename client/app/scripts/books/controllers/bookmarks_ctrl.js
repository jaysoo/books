'use strict';

define(['app', 'firebase'], function(App, Firebase) {
  App.controller('BookmarksCtrl', ['$scope', 'BooksRepository', 'SecurityService', 'angularFireCollection',
    function($scope, BooksRepository, SecurityService, angularFireCollection) {
      var booksRef = new Firebase('https://nulogy-books.firebaseio.com/books');
      var usersRef = new Firebase('https://nulogy-books.firebaseio.com/users');

      function bookmarksRef(user) {
        return usersRef.child(user.id()).child('bookmarks');
      }

      function safeApply($scope, applyFn) {
        if(!$scope.$$phase) $scope.$apply(applyFn);
        else applyFn();
      }

      $scope.$watch(function() {
        return SecurityService.currentUser();
      }, function(currentUser) {
        $scope.currentUser = currentUser;
      });


      $scope.$watch('currentUser', function(user) {
        if (user.isAuthenticated()) {
          $scope.bookmarksRef = bookmarksRef(user);
        }
      });

      $scope.$watch('bookmarksRef', function(ref) {
        if (ref) {
          var books = [];
          ref.on('child_added', function(bookmarkSnap) {
            if (bookmarkSnap.val()) {
              booksRef.child(bookmarkSnap.name()).once('value', function(bookSnap) {
                books.push(bookSnap.val());
                safeApply($scope, function() {
                  $scope.books = books;
                });
              });
            }
          });
        }
      });
    }
  ]);
});
