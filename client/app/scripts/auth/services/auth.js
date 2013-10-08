'use strict';

define([
  'lodash',
  'app',
  'firebase',

  '../models/user',

  'persona-sdk'

], function(_, App, Firebase, User) {
  App.service('AuthService', AuthService);

  function AuthService($rootScope, $q, angularFireAuth) {
    this.$rootScope = $rootScope;
    this.$q = $q;
    this.ref = new Firebase('https://nulogy-books.firebaseio.com');
    this.angularFireAuth = angularFireAuth;
  }

  AuthService.prototype.handleFireAuth = function(err, userData) {
    if (err) {
      this.deferred.reject({reason: 'Authentication failed', error: err});
    } else if (userData) {
      this.deferred.resolve(new User(userData));
    } else {
      this.deferred.resolve();
    }
  };

  AuthService.prototype.initialize = function() {
    this.deferred = this.$q.defer();
    this.angularFireAuth.initialize(this.ref, {
      scope: this.$rootScope.$new(),
      name: 'user',
      callback: _.bind(this.handleFireAuth, this)
    });
    return this.deferred.promise;
  };

  AuthService.prototype.login = function() {
    this.deferred = this.$q.defer();
    this.angularFireAuth.login('persona');
    return this.deferred.promise;
  };

  AuthService.prototype.logout = function() {
    this.deferred = this.$q.defer();
    this.angularFireAuth.logout();
    return this.deferred.promise;
  };

  return AuthService;
});
