'use strict';

define([
  'angular',
  'angular-animate',
  'angular-cookies',
  'angular-resource',
  'angular-route',
  'angular-fire',
  'bootstrap-dropdown',

  // Security
  'security/controllers/login-form',
  'security/controllers/current-user-toolbar',
  'security/services/authorization',
  'security/services/security'

], function(angular) {

  var App = angular.module('app', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'firebase',
    'security',
    'security.authorization',
    'security.login.form',
    'security.login.toolbar',
  ]);

  App.config(function($routeProvider) {
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
      .when('/add-book', {
        templateUrl: 'views/books/add.html',
        controller: 'AddBookCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });

  App.run(function($rootScope, $location, SecurityService) {
    SecurityService.requestCurrentUser().then(function() {
      $rootScope.$on('$routeChangeStart', function(evt, next) {
        if (!SecurityService.currentUser().isAuthenticated()) {
          if (next.$$route.controller !== 'LoginCtrl') {
            $location.path('/login');
          }
        }
      });
    });
  });

  App.run(function($rootScope, $location) {
    $rootScope.$on('$routeChangeError', function(ev, current, previous, rejection){
      if(rejection === 'Not Authorized'){
        $location.path('/login');
      }
    });
  });

  return App;
});
