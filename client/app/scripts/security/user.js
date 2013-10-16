'use strict';

define(['common/helpers/object'], function(OH) {
  function User(userData) {
    OH.setData(this, userData);
  }

  var props = {
    avatarUrl: function() {
      return 'http://www.gravatar.com/avatar/' + this.md5_hash + '?s=80&d=mm';
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
        }
      };
    }
  });


  return User;
});
