/* global Auth0 */
'use strict';

define([
  'lodash',
  'angular',
  './user'

], function(_, angular, User) {
  var module = angular.module('security', []);

  var userInfoUrl = 'https://nulogy-books.auth0.com/userinfo';
  var storedAccessToken = '';

  module.provider('SecurityService', [SecurityServiceProvider]);

  function SecurityServiceProvider() {
    var currentUser;

    function setAnonymousUser() {
      currentUser = User.anonymousUser();
    }
    setAnonymousUser();

    return {
      setAccessToken: function(accessToken) {
        storedAccessToken = accessToken;
      },

      $get: ['$location', '$q', '$http', '$cookies', '$timeout', function($location, $q, $http, $cookies, $timeout) {
        if (storedAccessToken) {
          $cookies.storedAccessToken = storedAccessToken;
        } else {
          storedAccessToken = $cookies.storedAccessToken;
        }

        return {
          isAuthenticated: function() {
            return currentUser.isAuthenticated();
          },

          requestCurrentUser: function() {
            var deferred = $q.defer();

            if (!storedAccessToken) {
              setAnonymousUser();
              deferred.resolve(currentUser);
            } else {
              var promise = $http.get(userInfoUrl + '?access_token=' + storedAccessToken);

              promise.then(function(response) {
                currentUser = new User(response.data);
                deferred.resolve(currentUser);
              }, function() {
                setAnonymousUser();
                deferred.resolve(currentUser);
              });
            }

            return deferred.promise;
          },

          currentUser: function() {
            return currentUser;
          },

          login: function() {
            Auth0.signIn({onestep: true});
          },

          logout: function() {
            var deferred = $q.defer();

            delete $cookies.storedAccessToken;

            setAnonymousUser();
            deferred.resolve(currentUser);

            $timeout(function() {
              $location.path('/login');
            }, 0);

            return deferred.promise;
          }
        };
      }]
    };
  }

  return SecurityServiceProvider;
});
