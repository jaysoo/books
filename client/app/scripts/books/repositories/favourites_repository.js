'use strict';

define([
  'lodash',
  'app',
  'firebase',

  'common/helpers/firebase'

], function(_, App, Firebase) {
  App.factory('FavouritesService', ['$resource', FavouritesService]);

  function FavouritesService($resource) {
    return {
      add: function(user, book) {
      },

      remove: function(user, book) {
      }
    };
  }

  return FavouritesService;
});
