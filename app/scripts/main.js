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
    'firebase': '//cdn.firebase.com/v0/firebase',
    'firebase-simple-login': '//cdn.firebase.com/v0/firebase-simple-login'
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

  // BooksApp
  'books/app',
  'books/routes',
  'books/run',
  'books/controllers/books_list',
  'books/controllers/login',
  'books/controllers/logged_in_user',
  'books/services/auth'

], function(angular) {
  return angular.bootstrap(document, ['booksApp']);
});

