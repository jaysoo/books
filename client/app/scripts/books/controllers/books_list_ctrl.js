'use strict';

define(['app', 'firebase'], function(App, Firebase) {
  App.controller('BooksListCtrl', ['$scope', 'FavouritesService', 'SecurityService', 'BooksRepository',
    function($scope, angularFireCollection, FavouritesService, SecurityService, BooksRepository) {
      $scope.books = BooksRepository.list();

      $scope.addToFavourites = function(user, book) {
        FavouritesService.create(user, book);
      };

      $scope.removeFromFavourites = function(user, book) {
        FavouritesService.remove(user, book);
      };
    }
  ]);
});
