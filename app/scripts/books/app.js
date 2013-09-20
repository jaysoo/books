'use strict';

define([
  'angular',
  'angular-animate',
  'angular-cookies',
  'angular-resource',
  'angular-route',
  'angular-fire'
], function(angular) {

  return angular.module('booksApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'firebase'
  ]);
});
