'use strict';

define([
  'angular',
  'angular-animate',
  'angular-cookies',
  'angular-resource',
  'angular-route',
  'angular-fire',
  'bootstrap-dropdown'
], function(angular) {

  return angular.module('app', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'firebase'
  ]);
});
