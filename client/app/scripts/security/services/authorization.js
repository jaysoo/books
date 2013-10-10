'use strict';

define([
  'lodash',
  'angular'

], function(_, angular) {
  angular.module('security.authorization', ['security']);
  angular.module('security.authorization').factory('AuthorizationService', AuthorizationService);

  function AuthorizationService($q, SecurityService) {
    return {
      requireAuthenticatedUser: function() {
        return SecurityService.requestCurrentUser().then(function(user) {
          if (!user.isAuthenticated()) {
            return $q.reject('Not Authorized');
          } else {
            return user;
          }
        });
      }
    };
  }
});
