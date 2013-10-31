'use strict';

define([
  'lodash',

  // App
  'config',
  'app-ctrl',

  'angular',
  'angular-animate',
  'angular-cookies',
  'angular-resource',
  'angular-route',
  'angular-fire',
  'bootstrap-dropdown',

  // Security
  'security/controllers/login-form',
  'security/services/authorization',
  'security/auth0/security'

  // App
], function(_, config, AppCtrl, angular) {

  var app = angular.module('app', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'firebase',
    'security',
    'security.authorization',
    'security.login.form'
  ]);

  app.constant('Config', config);

  app.controller('AppCtrl', AppCtrl);

  app.config(['$routeProvider', function($routeProvider) {
    $routeProvider
      .when('/login', {
        templateUrl: 'views/security/login-form.html',
        controller: 'LoginFormCtrl',
        resolve: {
          currentUser: function(SecurityService) {
            return SecurityService.currentUser();
          }
        }
      })
      .when('/', {
        templateUrl: 'views/books/books_list.html',
        controller: 'BooksListCtrl'
      })
      .when('/favourites', {
        templateUrl: 'views/books/favourites.html',
        controller: 'FavouritesCtrl'
      })
      .when('/add-book', {
        templateUrl: 'views/books/add.html',
        controller: 'AddBookCtrl'
      })
      .when('/sessions', {
        templateUrl: 'views/sessions/sessions_list.html',
        controller: 'SessionsCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  }]);

  app.config(['SecurityServiceProvider', function(SecurityServiceProvider) {
    var accessTokenMatch = /access_token=([^&]*)/g.exec(window.location.hash);
    var accessToken;
    if (accessTokenMatch) {
      accessToken = accessTokenMatch[1];
      SecurityServiceProvider.setAccessToken(accessToken);
    }
  }]);

  app.config(['SecurityServiceProvider', function(SecurityServiceProvider) {
    var loginFailureMatch = /login_failure=([^&]*)/g.exec(window.location.hash);
    var reason;
    if (loginFailureMatch) {
      reason = loginFailureMatch[1];
      SecurityServiceProvider.setLoginFailure(reason);
    }
  }]);

  app.run(['$rootScope', '$location', 'SecurityService', function($rootScope, $location, SecurityService) {
    SecurityService.requestCurrentUser().then(function() {
      checkAuth();

      $rootScope.$on('$routeChangeStart', function(evt, next) {
        if (next.$$route.controller !== 'LoginCtrl') {
          checkAuth();
        }
      });

      function checkAuth() {
        if (!SecurityService.currentUser().isAuthenticated()) {
          $location.path('/login');
        }
      }
    });
  }]);

  app.run(['$rootScope', '$location', function($rootScope, $location) {
    $rootScope.$on('$routeChangeError', function(ev, current, previous, rejection){
      if(rejection === 'Not Authorized'){
        $location.path('/login');
      }
    });
  }]);

  return app;
});
