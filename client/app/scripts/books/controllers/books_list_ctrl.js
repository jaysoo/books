'use strict';

define(['app', 'firebase'], function(App, Firebase) {
  App.controller('BooksListCtrl', ['$scope', 'angularFireCollection', 'BookmarksService', 'SecurityService',
    function($scope, angularFireCollection, BookmarksService, SecurityService) {
      var booksRef = new Firebase('https://nulogy-books.firebaseio.com/books');
      var usersRef = new Firebase('https://nulogy-books.firebaseio.com/users');

      function bookmarksRef(user) {
        return usersRef.child(user.id()).child('bookmarks');
      }

      $scope.books = angularFireCollection(new Firebase('https://nulogy-books.firebaseio.com/books'));

      $scope.$watch(function() {
        return SecurityService.currentUser();
      }, function(currentUser) {
        $scope.currentUser = currentUser;
      });

      function safeApply($scope, applyFn) {
        if(!$scope.$$phase) $scope.$apply(applyFn);
        else applyFn();
      }

      $scope.$watch('currentUser', function(user) {
        if (user.isAuthenticated()) {
          $scope.bookmarksRef = bookmarksRef(user);
        }
      });

      $scope.$watch('bookmarksRef', function(ref) {
        if (ref) {
          ref.on('child_added', function(bookmarkSnap) {
            if (bookmarkSnap.val()) {
              booksRef.child(bookmarkSnap.name()).once('value', function(bookSnap) {
                var book = _.find($scope.books, function(book) { return book.$id === bookSnap.name(); });
                if (book) {
                  safeApply($scope, function() {
                    book.isBookmarked = true;
                  });
                }
              });
            }
          });
        }
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
