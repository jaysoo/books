'use strict';

define(['lodash', 'app', 'firebase'], function(_, App, Firebase) {
  App.controller('BookDetailsCtrl', ['$scope', '$routeParams', '$location', '$modal', 'FavouritesRepository', 'SecurityService', 'BooksRepository',
    function($scope, $routeParams, $location, $modal, FavouritesRepository, SecurityService, BooksRepository) {
      $scope.mode = 'show';

      BooksRepository.get($routeParams.bookId).then(function(book) {
        $scope.book = book;

        FavouritesRepository.isFavourited(SecurityService.currentUser(), book).then(function(isFavourited) {
          $scope.isFavourited = isFavourited;
        });
      });

      $scope.addToFavourites = function(user, book) {
        FavouritesRepository.add(user, book);
        $scope.isFavourited = true;
      };

      $scope.removeFromFavourites = function(user, book) {
        FavouritesRepository.remove(user, book);
        $scope.isFavourited = false;
      };

      $scope.showEdit = function() {
        $scope.mode = 'edit';
      };

      $scope.hideEdit = function() {
        $scope.mode = 'show';
      };

      $scope.updateBook = function(book) {
        book.$update();
        $scope.mode = 'show';
      };

      $scope.deleteBook = function(book) {
        var modalInstance = $modal.open({
          templateUrl: 'partials/books/book_delete_confirmation.html',
          controller: DeleteBookConfirmationCtrl,
          resolve: {
            items: function () {
              return $scope.items;
            }
          }
        });

        modalInstance.result.then(function () {
          BooksRepository.remove(book).then(function() {
            $location.path('/books');
          });
        });
      };
    }
  ]);

  function DeleteBookConfirmationCtrl($scope, $modalInstance) {
    $scope.ok = function () {
      $modalInstance.close();
    };

    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };
  }
});
