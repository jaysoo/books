'use strict';

define(function() {
  function LoadingService() {
    var state = 'ready';

    return {
      state: function() { return state; },

      loading: function() {
        state = 'loading';
      },

      ready: function() {
        state = 'ready';
      }
    };
  }

  return LoadingService;
});
