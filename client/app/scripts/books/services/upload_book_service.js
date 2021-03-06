'use strict';

define([
  'lodash',
  'app',
  'filepicker'

], function(_, App, filepicker) {
  App.factory('UploadBookService', ['$q', 'config', UploadBookService]);

  function UploadBookService($q, config) {
    filepicker.setKey(config.FILEPICKER_API_KEY);

    return {
      upload: function() {
        var deferred = $q.defer();

        filepicker.pick({
          services: ['GOOGLE_DRIVE', 'COMPUTER']
        }, function(inkBlob) {
          deferred.resolve(inkBlob);
        }, function() {
          deferred.reject();
        });

        return deferred.promise;
      }
    };
  }

  return UploadBookService;
});
