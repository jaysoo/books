'use strict';

define(['angular', 'showdown'], function(angular, Showdown) {
  var m = angular.module('markdown', []);

  m.directive('markdown', function () {
    var converter = new Showdown.converter();

    return {
      restrict: 'E',

      require: 'ngModel',

      link: function (scope, element, attrs, ngModel) {
        if (!ngModel) {
          return;
        }

        ngModel.$render = function() {
          var html = converter.makeHtml(ngModel.$viewValue || '');
          element.html(html);
        };
      }
    };
  });
});
