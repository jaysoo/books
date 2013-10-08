'use strict';

require({
  paths: {
    'jquery': '../bower_components/jquery/jquery',
    'lodash': '../bower_components/lodash/dist/lodash',
    'angular': '../bower_components/angular/angular',
    'angular-animate': '../bower_components/angular-animate/angular-animate',
    'angular-cookies': '../bower_components/angular-cookies/angular-cookies',
    'angular-resource': '../bower_components/angular-resource/angular-resource',
    'angular-route': '../bower_components/angular-route/angular-route',
    'angular-sanitize': '../bower_components/angular-sanitize/angular-sanitize',
    'angular-fire': '//cdn.firebase.com/libs/angularfire/0.3.0/angularfire',
    'bootstrap-dropdown': '../bower_components/bootstrap-sass/js/bootstrap-dropdown',
    'firebase': '//cdn.firebase.com/v0/firebase',
    'firebase-simple-login': '//cdn.firebase.com/v0/firebase-simple-login',
    'persona-sdk': 'https://login.persona.org/include'
  },
  shim: {
    'lodash': {
      exports: '_'
    },
    'angular': {
      exports: 'angular'
    },
    'angular-animate': ['angular'],
    'angular-cookies': ['angular'],
    'angular-resource': ['angular'],
    'angular-route': ['angular'],
    'angular-sanitize': ['angular'],
    'angular-fire': ['angular', 'firebase', 'firebase-simple-login'],
    'bootstrap-dropdown': ['jquery'],
    'firebase': {
      exports: 'Firebase'
    },
    'firebase-simple-login': {
      deps: ['firebase'],
      exports: 'FirebaseSimpleLogin'
    }
  }
}, [
  'angular',

  // Routes
  'routes',

  // Authentication
  'auth/controllers/login',
  'auth/controllers/logged_in_user',
  'auth/services/auth',
  'auth/services/profile',

  // Books
  'app',
  'books/run',
  'books/controllers/add_book',
  'books/controllers/books_list',
  'books/services/add_book'

], function(angular) {
  return angular.bootstrap(document, ['app']);
});
