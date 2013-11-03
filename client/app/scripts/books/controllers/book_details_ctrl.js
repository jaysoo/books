'use strict';

define(['lodash', 'app', 'firebase'], function(_, App, Firebase) {
  App.controller('BookDetailsCtrl', ['$scope', '$routeParams', 'FavouritesRepository', 'SecurityService', 'BooksRepository',
    function($scope, $routeParams, FavouritesRepository, SecurityService, BooksRepository) {

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
    }
  ]);
});
