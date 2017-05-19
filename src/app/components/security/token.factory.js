(function () {
  'use strict';

  angular
    .module('shop')
    .factory('Token', Token);

  function Token(
    CommonService
  ) {
    var token = function (value, expire) {
      this.data = {};

      if (angular.isObject(value)) {
        this.data = value;
      } else {
        this.data.value = value;
        this.data.expire = expire;
      }
    };

    /**
     * @ngdoc method
     * @name Token.isInvalid
     * @returns {Boolean}
     * @description
     * Return whether token is authenticated or not
     */
    token.prototype.isValid = function () {
      if (!this.data.expire) {
        return false;
      }
      return CommonService.getNowSecond() < this.data.expire;
    };

    token.prototype.get = function () {
      return this.data.value || '';
    };

    return token;
  }
})();
