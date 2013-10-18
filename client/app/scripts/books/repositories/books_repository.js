'use strict';

define(['lodash', 'app', 'firebase'], function(_, App, Firebase) {
  App.factory('BooksRepository', function() {
    var ref = new Firebase('https://nulogy-books.firebaseio.com/books');

    return {
      list: function(ids) {
        var list = [];

        ref.on('child_added', function(snapshot) {
          if (_.contains(ids, snapshot.name())) {
            console.log(snapshot.name())
            list.push(snapshot.val());
          }
        });

        return list;
      }
    };
  });
});


