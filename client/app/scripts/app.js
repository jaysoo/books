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
      .when('/bookmarks', {
        templateUrl: 'views/books/bookmarks.html',
        controller: 'BookmarksCtrl'
      })
      .when('/add-book', {
        templateUrl: 'views/books/add.html',
        controller: 'AddBookCtrl'
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

  app.run(['$rootScope', '$location', 'SecurityService', function($rootScope, $location, SecurityService) {
    SecurityService.requestCurrentUser().then(function() {
      $rootScope.$on('$routeChangeStart', function(evt, next) {
        if (!SecurityService.currentUser().isAuthenticated()) {
          if (next.$$route.controller !== 'LoginCtrl') {
            $location.path('/login');
          }
        }
      });
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
