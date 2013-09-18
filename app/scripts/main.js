'use strict';

require({
  paths: {
    'jquery': '../bower_components/jquery/jquery',
    'underscore': '../bower_components/underscore/underscore',
    'angular': '../bower_components/angular/angular',
    'angular-cookies': '../bower_components/angular-cookies/angular-cookies',
    'angular-resource': '../bower_components/angular-resource/angular-resource',
    'angular-sanitize': '../bower_components/angular-sanitize/angular-sanitize'
  },
  shim: {
    'underscore': {
      exports: '_'
    },
    'angular': {
      exports: 'angular'
    },
    'angular-cookies': ['angular'],
    'angular-resource': ['angular'],
    'angular-sanitize': ['angular']
  }
}, [
  'angular',

  // BooksApp
  'books/app',
  'books/routes',
  'books/controllers/books_list'

], function(angular) {
  return angular.bootstrap(document, ['booksApp']);
});

