'use strict';

define(['lodash', 'app', 'firebase'], function(_, App, Firebase) {
  App.controller('FavouritesCtrl', ['$scope', 'FavouritesRepository', 'BooksRepository',
    function($scope, FavouritesRepository, BooksRepository) {

      FavouritesRepository.list().then(loadBooksFromFavourites);

      $scope.removeFavourite = function(user, book) {
        FavouritesRepository.remove(user, book);

        $scope.books = _.without($scope.books, function(b) {
          return b.id === book.id;
        });
      };

      function loadBooksFromFavourites(favs) {
        if (favs.length > 0) {
          var bookIds = _.pluck(favs, 'book_id');
          BooksRepository.find(bookIds).then(function(books) {
            $scope.books = books;
          });
        }
      }
    }
  ]);
});
