(function () {
  'use strict';

  angular
    .module('shop')
    .factory('User', User);

  function User(
    Config
  ) {
    var user = function (mobile, avatar) {
      this.data = {};

      if (angular.isObject(mobile)) {
        this.data = mobile;
      } else {
        this.data.mobile = mobile;
        this.data.avatar = avatar || Config.PATH.IMAGE + 'avatar.png';
      }
    };

    user.prototype.getMobile = function () {
      return this.data.mobile;
    };

    user.prototype.getAvatar = function () {
      return this.data.avatar || Config.PATH.IMAGE + 'avatar.png';
    };

    return user;
  }
})();
