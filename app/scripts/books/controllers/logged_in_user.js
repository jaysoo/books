'use strict';

define(['books/app'], function(BooksApp) {
  BooksApp.controller('LoggedInUserCtrl', function ($scope, $location, AuthService) {
    $scope.logout = function() {
      AuthService.logout()
      .then(function() {
        $location.url('/login');
      });
    };
  });
});
