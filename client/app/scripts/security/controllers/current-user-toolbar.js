'use strict';

define(['angular'], function(angular) {
  angular.module('security.login.toolbar', ['security']);
  angular.module('security.login.toolbar').controller('CurrentUserToolbarCtrl', function($scope, SecurityService) {
    $scope.isAuthenticated = SecurityService.isAuthenticated;
    $scope.$watch(function() {
      return SecurityService.currentUser();
    }, function(currentUser) {
      $scope.currentUser = currentUser;
    });
    $scope.logout = SecurityService.logout;
  });
});
