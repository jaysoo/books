'use strict';

define(['app'], function(App) {
  App.config(function($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/books/books_list.html',
        controller: 'BooksListCtrl'
      })
      .when('/login', {
        templateUrl: 'views/auth/login.html',
        controller: 'LoginCtrl'
      })
      .when('/add-book', {
        templateUrl: 'views/books/add.html',
        controller: 'AddBookCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
});
