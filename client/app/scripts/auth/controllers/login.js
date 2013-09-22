'use strict';

define(['app'], function(App) {
  App.controller('LoginCtrl', function ($scope, $location, AuthService) {
    $scope.login = function() {
      AuthService.login().then(function() {
        $location.url('/');
      });
    };
  });
});

