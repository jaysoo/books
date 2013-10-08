'use strict';

define({
  callbackFor: function(deferred) {
    return function(err){
      if (err) {
        deferred.reject(err);
      } else {
        deferred.resolve();
      }
    };
  }
});
