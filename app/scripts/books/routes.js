'use strict';

define(['books/app'], function(BooksApp) {
  BooksApp.config(function($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/books_list.html',
        controller: 'BooksListCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
});
