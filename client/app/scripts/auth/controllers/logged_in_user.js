'use strict';

define(['app'], function(App) {
  App.controller('LoggedInUserCtrl', function($rootScope, $scope, $location, AuthService) {
    $scope.avatarUrl = function() {
      return $scope.user ? $scope.user.avatarUrl() : '';
    };

    $scope.logout = function() {
      AuthService.logout()
      .then(function() {
        $rootScope.user = null;
        $location.path('/login');
      });
    };
  });
});
