'use strict';

define([
  'angular',
  'angular-cookies',
  'angular-resource',
  'angular-fire'
], function(angular) {

  return angular.module('booksApp', [
    'ngCookies',
    'ngResource',
    'firebase'
  ]);
});
