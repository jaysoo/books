/* global Auth0Widget */
'use strict';

define([
  'lodash',
  'angular',
  'firebase',
  './user'

], function(_, angular, Firebase, User) {
  var module = angular.module('security', []);

  var storedAccessToken = '';
  var loginFailure = null;

  module.provider('SecurityService', [SecurityServiceProvider]);

  function SecurityServiceProvider() {
    var currentUser, loginWidget;

    function setAnonymousUser() {
      currentUser = User.anonymousUser();
    }

    setAnonymousUser();

    return {
      setAccessToken: function(accessToken) {
        storedAccessToken = accessToken;
      },

      setLoginFailure: function(reason) {
        loginFailure = reason;
      },

      $get: ['$location', '$q', '$http', '$cookies', '$window', 'config', function($location, $q, $http, $cookies, $window, config) {
        if (storedAccessToken) {
          $cookies.storedAccessToken = storedAccessToken;
        } else {
          storedAccessToken = $cookies.storedAccessToken;
        }

        loginWidget = new Auth0Widget({
          domain: config.AUTH0_DOMAIN,
          clientID: config.AUTH0_CLIENT_ID,
          callbackURL: window.location.protocol + '//' + window.location.host + '/auth/auth0/callback'
        });

        return {
          loginFailed: function() {
            return this.loginFailureReason() !== null;
          },

          loginFailureReason: function() {
            return loginFailure;
          },

          isAuthenticated: function() {
            return currentUser.isAuthenticated();
          },

          requestCurrentUser: function() {
            var deferred = $q.defer();

            $http.get('/identity').success(function(userData) {
              if (userData !== 'null') {
                currentUser = new User(userData);
                deferred.resolve(currentUser);
              } else {
                setAnonymousUser();
                deferred.resolve(currentUser);
              }
            }).error(function() {
              setAnonymousUser();
              deferred.resolve(currentUser);
            });

            return deferred.promise;
          },

          currentUser: function() {
            return currentUser;
          },

          login: function() {
            loginWidget.signin();
          },

          logout: function() {
            var deferred = $q.defer();

            delete $cookies.storedAccessToken;

            $http.post('/logout').success(function() {
              setAnonymousUser();
              deferred.resolve(currentUser);
              $location.path('/login');
            });

            return deferred.promise;
          }
        };
      }]
    };
  }

  return SecurityServiceProvider;
});
