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

      $scope.removeAttachment = function(attachment) {
        $scope.book.attachments = _.without($scope.book.attachments, attachment);
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
        var picker = new google.picker.PickerBuilder()
          .setAppId(Config.GOOGLE_APP_ID)
          .setDeveloperKey(Config.GOOGLE_API_KEY)
          .enableFeature(google.picker.Feature.MULTISELECT_ENABLED)
          .addView(google.picker.ViewId.PDFS)
          .addView(google.picker.ViewId.DOCS)
          .addView(new google.picker.DocsUploadView())
          .setCallback(pickerCallback)
          .build();
        picker.setVisible(true);
      }

      function pickerCallback(data) {
        if (data.action === google.picker.Action.PICKED) {
          var attachments = _.map(data.docs, function(doc) {
            return {
              id: doc.id,
              name: doc.name,
              url: doc.url,
              iconUrl: doc.iconUrl,
              mimeType: doc.mimeType
            };
          });

          $scope.book.attachments = _.flatten([$scope.book.attachments, attachments]);
        }
      }
    }
  ]);
});
