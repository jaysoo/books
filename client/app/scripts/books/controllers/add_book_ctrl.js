'use strict';

define(['app', 'firebase', 'common/helpers/firebase'], function(App, Firebase, FirebaseHelper) {
  App.controller('AddBookCtrl', function ($scope, $location, AddBookService) {
    $scope.add = function() {
      AddBookService.add($scope.book).then(function() {
        $location.path('/');
      });
    };

    $scope.cancel = function() {
      $scope.book = {};
      $location.path('/');
    };
  });
});

