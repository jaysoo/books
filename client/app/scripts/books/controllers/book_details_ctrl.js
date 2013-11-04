/* globals google */

'use strict';

define(['lodash', 'app', 'goog!picker'], function(_, App) {
  App.controller('BookDetailsCtrl', ['$scope', '$routeParams', '$location', '$modal', 'Config', 'FavouritesRepository', 'SecurityService', 'BooksRepository',
    function($scope, $routeParams, $location, $modal, Config, FavouritesRepository, SecurityService, BooksRepository) {
      $scope.mode = 'show';

      BooksRepository.get($routeParams.bookId).then(function(book) {
        $scope.book = book;

        FavouritesRepository.isFavourited(SecurityService.currentUser(), book).then(function(isFavourited) {
          $scope.isFavourited = isFavourited;
        });
      });

      $scope.addToFavourites = function(user, book) {
        FavouritesRepository.add(user, book);
        $scope.isFavourited = true;
      };

      $scope.removeFromFavourites = function(user, book) {
        FavouritesRepository.remove(user, book);
        $scope.isFavourited = false;
      };

      $scope.showEdit = function() {
        $scope.mode = 'edit';
      };

      $scope.hideEdit = function() {
        $scope.mode = 'show';
      };

      $scope.updateBook = function(book) {
        book.$update();
        $scope.mode = 'show';
      };

      $scope.deleteBook = function(book) {
        var modalInstance = $modal.open({
          templateUrl: 'partials/books/book_delete_confirmation.html',
          controller: DeleteBookConfirmationCtrl,
          resolve: {
            items: function () {
              return $scope.items;
            }
          }
        });

        modalInstance.result.then(function () {
          BooksRepository.remove(book).then(function() {
            $location.path('/books');
          });
        });
      };

      $scope.attachFile = function() {
        pickFile();
      };

      function DeleteBookConfirmationCtrl($scope, $modalInstance) {
        $scope.ok = function () {
          $modalInstance.close();
        };

        $scope.cancel = function () {
          $modalInstance.dismiss('cancel');
        };
      }

      function pickFile() {
        var view = new google.picker.View(google.picker.ViewId.DOCS);
        view.setMimeTypes('image/png,image/jpeg,image/jpg');
        var picker = new google.picker.PickerBuilder()
          .enableFeature(google.picker.Feature.NAV_HIDDEN)
          .enableFeature(google.picker.Feature.MULTISELECT_ENABLED)
          .setAppId(Config.GOOGLE_APP_ID)
          .addView(view)
          .addView(new google.picker.DocsUploadView())
          .setDeveloperKey(Config.GOOGLE_API_KEY)
          .setCallback(pickerCallback)
          .build();
        picker.setVisible(true);
      }

      function pickerCallback(data) {
        if (data.action === google.picker.Action.PICKED) {
          var fileId = data.docs[0].id;
          window.alert('The user selected: ' + fileId);
        }
      }
    }
  ]);
});
