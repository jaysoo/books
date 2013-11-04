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
    'firebase-simple-login': '//cdn.firebase.com/v0/firebase-simple-login',
    'persona-sdk': 'https://login.persona.org/include',
    'filepicker': '//api.filepicker.io/v1/filepicker',
    'angular-bootstrap': '../bower_components/angular-bootstrap/ui-bootstrap-tpls',
    'async': '../bower_components/requirejs-plugins/src/async',
    'propertyParser': '../bower_components/requirejs-plugins/src/propertyParser',
    'goog': '../bower_components/requirejs-plugins/src/goog'
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
    'angular-bootstrap': ['angular'],
    'angular-fire': ['angular', 'firebase', 'firebase-simple-login'],
    'bootstrap-dropdown': ['jquery'],
    'firebase': {
      exports: 'Firebase'
    },
    'firebase-simple-login': {
      deps: ['firebase'],
      exports: 'FirebaseSimpleLogin'
    },
    'filepicker': {
      exports: 'filepicker'
    }
  }
}, [
  'angular',

  // Books
  'books/controllers/add_book_ctrl',
  'books/controllers/book_details_ctrl',
  'books/controllers/books_list_ctrl',
  'books/controllers/favourites_ctrl',
  'books/repositories/books_repository',
  'books/repositories/favourites_repository',
  'books/services/upload_book_service',

  'sessions/sessions_ctrl',
  'sessions/sessions_repository',
  'sessions/votes_repository',

  'app'

], function(angular) {
  return angular.bootstrap(document, ['app']);
});

