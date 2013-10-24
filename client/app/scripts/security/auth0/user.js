'use strict';

define(['common/helpers/object'], function(OH) {
  function User(userData) {
    OH.setData(this, userData);
  }

  var props = {
    avatarUrl: function() {
      return this.image;
    },

    isAuthenticated: function() {
      return true;
    }
  };

  OH.include(User, props);

  OH.extend(User, {
    anonymousUser: function() {
      return {
        isAuthenticated: function() {
          return false;
        },

        id: function() {
          return null;
        },

        avatarUrl: function() {
          return '';
        }
      };
    }
  });


  return User;
});
