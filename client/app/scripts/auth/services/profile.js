'use strict';

define([
  'lodash',
  'app',
  'firebase'

], function(_, App, Firebase) {
  App.service('ProfileService', ProfileService);

  function ProfileService($rootScope, $q) {
    this.$rootScope = $rootScope;
    this.$q = $q;
    this.ref = new Firebase('https://nulogy-books.firebaseio.com/users');
  }

  ProfileService.prototype.update = function(user) {
    var deferred = this.$q.deferred();
    var userRef = this.ref.child(user.md5_hash);

    userRef.child('profile').set(user.profile, function(err) {
      if (err) {
        deferred.reject({message: 'ProfileService.update failed', error: err});
      } else {
        deferred.resolve(user);
      }
    });

    return deferred.promise;
  };

  return ProfileService;
});

