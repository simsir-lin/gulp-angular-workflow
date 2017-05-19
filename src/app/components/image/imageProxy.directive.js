(function () {
  'use strict';

  angular
    .module('shop')
    .directive('imageProxy', imageProxy);

  function imageProxy(
    Config
  ) {
    return {
      restrict: 'A',
      link: postLink
    };

    function postLink(scope, element, attrs) {
      var imagePlaceHolder = attrs.imageProxyPlaceholder || Config.PATH.IMAGE + 'image-placeholder.svg';
      var imageNotFound = attrs.imageProxyNotfound || Config.PATH.IMAGE + 'image-not-found.svg';
      var imageUrl = attrs.imageProxy || imageNotFound;

      element.attr('src', imagePlaceHolder);

      var img = angular.element('<img>');
      img.on('load', onImageLoaded);
      img.on('error', onImageError);
      img.attr('src', imageUrl);

      function onImageLoaded() {
        element.attr('src', imageUrl);
      }

      function onImageError() {
        element.attr('src', imageNotFound);
      }
    }
  }

})();
