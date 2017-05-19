(function () {
  'use strict';

  angular
    .module('shop')
    .filter('dateformat', dateformat);

  function dateformat(
  ) {
    return function (input) {
      var date = new Date();
      date.setTime(input * 1000);
      return date.toLocaleString();
    };
  }

})();
