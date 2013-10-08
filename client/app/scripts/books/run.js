'use strict';

define(['app'], function(App) {

  App.run(function($rootScope, $location, AuthService) {
    AuthService.initialize().then(function(user) {
      $rootScope.user = user;
      if (user && $location.url() === '/login') {
        $location.url('/');
      }

      $rootScope.initialized = true;

      $rootScope.$on('$routeChangeStart', function(evt, next) {
        if (!$rootScope.user) {
          if (next.$$route.controller !== 'LoginCtrl') {
            $rootScope.redirectUrl = $location.path();
            $location.path('/login');
          }
        }
      });
    });
  });
});

