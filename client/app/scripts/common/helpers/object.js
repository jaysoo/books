'use strict';

define({
  setData: function(obj, data) {
    var k;
    for (k in data) {
      obj[k] = data[k];
    }
  },

  include: function(Model, properties) {
    var propName;

    for (propName in properties) {
      Object.defineProperty(Model.prototype, propName, {
        value: properties[propName],
        enumerable: false
      });
    }
  },

  extend: function(Model, properties) {
    var propName;

    for (propName in properties) {
      Object.defineProperty(Model, propName, {
        value: properties[propName],
        enumerable: false
      });
    }
  }
});
