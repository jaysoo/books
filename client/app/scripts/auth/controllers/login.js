'use strict';

define(['app'], function(App) {
  App.controller('LoginCtrl', function ($rootScope, $scope, $location, AuthService) {
    $scope.login = function() {
      AuthService.login().then(function(user) {
        $rootScope.user = user;
        $location.url('/');
      });
    };
  });
});

