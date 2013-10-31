'use strict';

define(['angular'], function(angular) {
  var module = angular.module('security.login.form', ['security']);

  module.controller('LoginFormCtrl', ['$scope', 'SecurityService', function ($scope, SecurityService) {
    $scope.$watch(function() {
      return SecurityService.currentUser();
    }, function(currentUser) {
      $scope.currentUser = currentUser;
    });

    $scope.login = SecurityService.login;

    $scope.loginFailureReason = SecurityService.loginFailureReason();
  }]);
});
