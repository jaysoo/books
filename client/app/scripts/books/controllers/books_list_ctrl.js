'use strict';

define(['lodash', 'app', 'firebase'], function(_, App, Firebase) {
  App.controller('BooksListCtrl', ['$scope', 'FavouritesRepository', 'SecurityService', 'BooksRepository',
    function($scope, FavouritesRepository, SecurityService, BooksRepository) {
      $scope.favourited = {};

      BooksRepository.list().then(function(books) {
        $scope.books = books;
      });

      FavouritesRepository.list().then(function(favs) {
        _.each(favs, function(fav) {
          $scope.favourited[fav.book_id] = true;
        });
      });

      $scope.addToFavourites = function(user, book) {
        FavouritesRepository.add(user, book);
        $scope.favourited[book.id] = true;
      };

      $scope.removeFromFavourites = function(user, book) {
        FavouritesRepository.remove(user, book);
        $scope.favourited[book.id] = false;
      };
    }
  ]);
});
