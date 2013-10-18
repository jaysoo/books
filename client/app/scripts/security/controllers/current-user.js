'use strict';

define(['angular'], function(angular) {
  var module = angular.module('security.login.currentuser', ['security']);

  module.controller('CurrentUserCtrl', ['$scope', 'SecurityService', function($scope, SecurityService) {
    $scope.isAuthenticated = SecurityService.isAuthenticated;

    $scope.sidebarIsShown = false;

    $scope.showSidebar = function() {
      $scope.sidebarIsShown = !$scope.sidebarIsShown;
    };


    $scope.$watch(function() {
      return SecurityService.currentUser();
    }, function(currentUser) {
      $scope.currentUser = currentUser;
    });

    $scope.logout = function() {
      SecurityService.logout().then(function() {
        $scope.sidebarIsShown = false;
      });
    }
  }]);
});
