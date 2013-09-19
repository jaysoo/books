'use strict';

define([
  'lodash',
  'books/app',
  'firebase'

], function(_, BooksApp, Firebase) {
  BooksApp.service('AuthService', AuthService);

  function AuthService($rootScope, $q, angularFireAuth) {
    this.$rootScope = $rootScope;
    this.$q = $q;
    this.ref = new Firebase('https://nulogy-books.firebaseio.com');
    this.angularFireAuth = angularFireAuth;
  }

  AuthService.prototype.handleFireAuth = function(err, user) {
    if (err) {
      this.deferred.reject(err);
    } else if (user) {
      this.deferred.resolve(user);
    } else {
      this.deferred.resolve();
    }
  };

  AuthService.prototype.initialize = function() {
    this.deferred = this.$q.defer();
    this.angularFireAuth.initialize(this.ref, {
      scope: this.$rootScope,
      name: 'user',
      callback: _.bind(this.handleFireAuth, this)
    });
    return this.deferred.promise;
  };

  AuthService.prototype.login = function() {
    this.deferred = this.$q.defer();
    this.angularFireAuth.login('github');
    return this.deferred.promise;
  };

  AuthService.prototype.logout = function() {
    this.deferred = this.$q.defer();
    this.angularFireAuth.logout();
    return this.deferred.promise;
  };

  return AuthService;
});
