(function () {
  'use strict';

  angular
    .module('shop')
    .service('CommonService', CommonService);

  function CommonService(
    $window
  ) {
    var service = {};

    service.getNowTime = getNowTime;
    service.getNowSecond = getNowSecond;

    service.scrollBottom = scrollBottom;
    service.scrollTop = scrollTop;

    service.sort = sort;

    /**
     * @ngdoc method
     * @name CommonService.sort
     * @param {Array}
     * @returns {Array}
     * @description - 数组从小到大排序
     */
    function sort(arr) {
      arr.sort(function (n1, n2) {
        return n1 - n2;
      });
      return arr;
    }

    function getNowTime() {
      return new $window.Date().getTime();
    }

    function getNowSecond() {
      return parseInt(getNowTime()/1000);
    }

    function scrollBottom() {
      $window.scrollTo(0, document.body.scrollHeight);
    }

    function scrollTop() {
      $window.scrollTo(0, 0);
    }

    return service;
  }
})();
