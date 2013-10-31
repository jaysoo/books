'use strict';

define(['lodash', 'app', 'firebase'], function(_, App, Firebase) {
  App.controller('FavouritesCtrl', ['$scope', 'FavouritesRepository', 'BooksRepository',
    function($scope, FavouritesRepository, BooksRepository) {
      FavouritesRepository.list().then(loadBooksFromFavourites);

      function loadBooksFromFavourites(favs) {
        var bookIds = _.pluck(favs, 'book_id');
        BooksRepository.find(bookIds).then(function(books) {
          $scope.books = books;
        });
      }
    }
  ]);
});
