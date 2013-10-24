'use strict';

define(['app', 'firebase'], function(App, Firebase) {
  App.controller('BooksListCtrl', ['$scope', 'angularFireCollection', 'BookmarksService', 'SecurityService', 'BooksRepository',
    function($scope, angularFireCollection, BookmarksService, SecurityService, BooksRepository) {
      $scope.books = BooksRepository.list();
    }
  ]);
});
