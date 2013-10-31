'use strict';

define(['lodash', 'app'], function(_, App) {
  App.factory('PeriodsRepository', ['$resource', '$q',
    function ($resource, $q) {
      var Period = $resource('/periods/:id', {
        id: '@id'
      });

      Object.defineProperties(Period.prototype, {
        'id': {
          get: function() {
            return this._id;
          }
        }
      });

      return {
        list: function() {
          var deferred = $q.defer();
          Period.query(function(periods) {
            deferred.resolve(periods);
          });
          return deferred.promise;
        },

        create: function(periodData) {
          var deferred = $q.defer();

          var period = new Period(periodData);

          period.$add(function() {
            deferred.resolve(period);
          });

          return deferred.promise;
        },

        remove: function(period) {
          var deferred = $q.defer();

          Period.remove({id: period.id}, function() {
            deferred.resolve();
          });

          return deferred.promise;
        }
      };
    }
  ]);
});
