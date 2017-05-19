(function () {
  'use strict';

  angular
    .module('shop')
    .service('Modal', Modal);

  function Modal(
    $uibModal
  ) {
    var service = {};

    service.openBottomModal = openBottomModal;

    return service;

    function openBottomModal(option) {
      var modalInstance = $uibModal.open({
        windowClass: 'simsir-shop-modal',
        templateUrl: option.templateUrl,
        controller: option.controller,
        resolve: option.resolve || {}
      });

      return modalInstance.result;
    }
  }
})();
