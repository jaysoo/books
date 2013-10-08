'use strict';

define(['helpers/model'], function(ModelHelpers) {
  function User(userData) {
    ModelHelpers.setData(this, userData);
  }

  ModelHelpers.extend(User, {
    avatarUrl: function() {
      return 'http://www.gravatar.com/avatar/' + this.md5_hash + '?s=80&d=mm';
    }
  });

  return User;
});
