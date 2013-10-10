'use strict';

define(['angular'], function(angular) {
  angular.module('security.login.form', ['security']);
  angular.module('security.login.form').controller('LoginFormCtrl', function ($scope, SecurityService) {
    $scope.$watch(function() {
      return SecurityService.currentUser();
    }, function(currentUser) {
      $scope.currentUser = currentUser;
    });
    $scope.login = SecurityService.login;
  });
});

