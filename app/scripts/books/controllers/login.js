'use strict';

define(['books/app'], function(BooksApp) {
  BooksApp.controller('LoginCtrl', function ($scope, $location, AuthService) {
    $scope.login = function() {
      AuthService.login().then(function() {
        $location.url('/');
      });
    };
  });
});

