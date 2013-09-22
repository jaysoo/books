'use strict';

define(['app'], function(App) {
  App.controller('LoggedInUserCtrl', function ($scope, $location, AuthService) {
    $scope.logout = function() {
      AuthService.logout()
      .then(function() {
        $location.url('/login');
      });
    };
  });
});
