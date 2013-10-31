'use strict';

define(['app'], function(App) {

  App.controller('AddBookCtrl', ['$scope', '$location', 'BooksRepository', 'UploadBookService',
    function($scope, $location, BooksRepository, UploadBookService) {
      $scope.book = {};

      $scope.add = function() {
        BooksRepository.create($scope.book);
        $location.path('/');
      };

      $scope.cancel = function() {
        $location.path('/');
      };

      $scope.addAttachment = function() {
        UploadBookService.upload().then(function(data) {
          $scope.book.title = data.filename;
          $scope.book.meta = data;
        });
      };

      $scope.removeAttachment = function() {
        delete $scope.book.meta;
      };
    }
  ]);
});

