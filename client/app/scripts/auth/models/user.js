'use strict';

define(['helpers/object'], function(ObjectHelpers) {
  function User(userData) {
    ObjectHelpers.setData(this, userData);
  }

  ObjectHelpers.extend(User, {
    avatarUrl: function() {
      return 'http://www.gravatar.com/avatar/' + this.md5_hash + '?s=80&d=mm';
    }
  });

  return User;
});
