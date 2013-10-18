'use strict';

define([
  'lodash',
  'config',

  'angular',
  'angular-animate',
  'angular-cookies',
  'angular-resource',
  'angular-route',
  'angular-fire',
  'bootstrap-dropdown',

  // Security
  'security/controllers/login-form',
  'security/controllers/current-user',
  'security/services/authorization',
  'security/services/security'

], function(_, config, angular) {

  var App = angular.module('app', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'firebase',
    'security',
    'security.authorization',
    'security.login.form',
    'security.login.currentuser',
  ]);

  App.constant('Config', config);

  App.config(['$routeProvider', function($routeProvider) {
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
  }]);

  App.run(['$rootScope', '$location', 'SecurityService', function($rootScope, $location, SecurityService) {
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

  App.run(['$rootScope', '$location', function($rootScope, $location) {
    $rootScope.$on('$routeChangeError', function(ev, current, previous, rejection){
      if(rejection === 'Not Authorized'){
        $location.path('/login');
      }
    });
  }]);

  return App;
});
