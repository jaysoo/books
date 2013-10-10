'use strict';

define([
  'lodash',
  'angular',
  'firebase',

  '../user',

  'persona-sdk'

], function(_, angular, Firebase, User) {
  angular.module('security', []);
  angular.module('security').factory('SecurityService', SecurityService);

  function SecurityService($rootScope, $q, angularFireAuth, $location) {
    var ref = new Firebase('https://nulogy-books.firebaseio.com');
    var deferred;
    var currentUser = User.anonymousUser();
    var scope = $rootScope.$new();

    scope.$on('angularFireAuth:logout', function() {
      $location.path('/login');
    });

    return {
      isAuthenticated: function() {
        return currentUser.isAuthenticated();
      },

      requestCurrentUser: function() {
        deferred = $q.defer();
        angularFireAuth.initialize(ref, {
          scope: scope,
          name: 'user',
          callback: _.bind(this.handleFireAuth, this)
        });
        return deferred.promise;
      },

      currentUser: function() {
        return currentUser;
      },

      login: function() {
        deferred = $q.defer();
        angularFireAuth.login('persona');
        return deferred.promise;
      },

      logout: function() {
        deferred = $q.defer();
        angularFireAuth.logout();
        return deferred.promise;
      },

      handleFireAuth: function(err, userData) {
        if (err) {
          deferred.reject({reason: 'Authentication failed', error: err});
        }
        currentUser = userData ? new User(userData) : User.anonymousUser();
        deferred.resolve(currentUser);
      }
    };
  }

  return SecurityService;
});
