'use strict';

define(function() {
  return ['$scope', '$location', 'SecurityService', function($scope, $location, SecurityService) {
    $scope.isAuthenticated = SecurityService.isAuthenticated;

    $scope.sidebarIsShown = false;

    $scope.toggleSidebar = function() {
      $scope.sidebarIsShown = !$scope.sidebarIsShown;
    };

    $scope.showSidebar = function() {
      $scope.sidebarIsShown = true;
    };

    $scope.closeSidebar = function() {
      $scope.sidebarIsShown = false;
    };

    $scope.showBooks = function() {
      $location.path('/');
    };

    $scope.showBookmarks = function() {
      $location.path('/bookmarks');
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
    };
  }];
});
