'use strict';

define(['app'], function(App) {

  App.controller('AddBookCtrl', ['$scope', '$location', 'AddBookService', 'UploadBookService',
    function($scope, $location, AddBookService, UploadBookService) {
      $scope.book = {};

      $scope.add = function() {
        AddBookService.add($scope.book).then(function() {
          $location.path('/');
        });
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

