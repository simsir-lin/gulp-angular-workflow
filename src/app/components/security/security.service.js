(function () {
  'use strict';

  angular
    .module('shop')
    .service('SecurityService', SecurityService);

  function SecurityService(
    $http,
    $q,
    Token,
    User,
    localStorageService,
    Config,
    HttpService
  ) {
    var service = {};

    var defaultOption = {
      isRemeber: false
    };
    var _token = new Token({});
    var _refresh_token = new Token({});
    var _user = new User({});

    service.ERROR = {
      'UNAUTHENTICATION': 'UNAUTHENTICATION'   // 没登陆的
      // 'UNAUTHORIZATION': 'UNAUTHORIZATION'  // 没权访问的
    };

    service.register = register;
    service.authenticate = authenticate;
    service.userAuthenticatedPromise = userAuthenticatedPromise;

    service.logout = logout;

    service.reloadToken = reloadToken;
    service.getToken = getToken;
    service.getUser = getUser;

    return service;

    /*============== public ===============*/

    /**
     * @ngdoc method
     * @name SecurityService.register
     * @param {String} mobile
     * @param {String} password
     * @returns {Promise}
     * @description - 注册用户(前提：验证码验证通过)
     */
    function register(mobile, password) {
      var deferred = $q.defer();

      HttpService
        .post('/register', {
          mobile: mobile,
          password: password
        })
        .then(function () {
          deferred.resolve();
        }, function (msg) {
          deferred.reject(msg);
        });

      return deferred.promise;
    }

    /**
     * @ngdoc method
     * @name SecurityService.authenticate
     * @param {String} mobile
     * @param {String} password
     * @param {Object} option
     *   {
     *     isRemeber: Boolean, // 是否记住用户登录，默认为false
     *   }
     * @returns {Promise}
     * @description - 验证用户信息是否正确
     */
    function authenticate(mobile, password, option) {
      var deferred = $q.defer();

      option = angular.extend({}, defaultOption, option || {});

      HttpService
        .post('/login', {
          mobile: mobile,
          password: password
        })
        .then(function (response) {
          var data = response.data.msg;

          _token = new Token(data.access_token, data.access_token_expire_at);
          _refresh_token = new Token(data.refresh_token, data.refresh_token_expire_at);
          _user = new User(data.mobile, data.head_pic);

          if (option.isRemeber) {
            localStorageService.set(Config.SECURITY.CACHEKEY.ACCESSTOKEN, {
              value: data.access_token,
              expire: data.access_token_expire_at
            });
            localStorageService.set(Config.SECURITY.CACHEKEY.REFRESHTOKEN, {
              value: data.refresh_token,
              expire: data.refresh_token_expire_at
            });
          }
          deferred.resolve();
        }, function (msg) {
          deferred.reject(msg);
        });

      return deferred.promise;
    }

    function userAuthenticatedPromise() {
      var deferred = $q.defer();

      if (_token.isValid()) {
        deferred.resolve(_token.get());
      } else {
        _token = new Token(localStorageService.get(Config.SECURITY.CACHEKEY.ACCESSTOKEN) || {});
        if (_token.isValid()) {
          deferred.resolve(_token.get());
        } else {
          _refresh_token = new Token(localStorageService.get(Config.SECURITY.CACHEKEY.REFRESHTOKEN) || {});
          if (_refresh_token.isValid()) {
            // TODO: 刷新令牌
            refreshToken(_refresh_token.get()).then(function (token) {
              localStorageService.set(Config.SECURITY.CACHEKEY.ACCESSTOKEN, token);
              _token = new Token(token);
              deferred.resolve(_token.get());
            }, function () {
              deferred.reject(service.ERROR.UNAUTHENTICATION);
            });
          } else {
            deferred.reject(service.ERROR.UNAUTHENTICATION);
          }
        }
      }

      return deferred.promise;
    }

    function logout() {
      _token = new Token({});
      _refresh_token = new Token({});
      _user = new User({});
      localStorageService.set(Config.SECURITY.CACHEKEY.ACCESSTOKEN, null);
      localStorageService.set(Config.SECURITY.CACHEKEY.REFRESHTOKEN, null);
    }

    // 两小时过期
    function reloadToken() {
      var deferred = $q.defer();

      _refresh_token = new Token(localStorageService.get(Config.SECURITY.CACHEKEY.REFRESHTOKEN) || {});
      if (_refresh_token.isValid()) {
        // TODO: 刷新令牌
        refreshToken(_refresh_token.get()).then(function (token) {
          localStorageService.set(Config.SECURITY.CACHEKEY.ACCESSTOKEN, token);
          _token = new Token(token);
          deferred.resolve(_token.get());
        }, function () {
          deferred.reject(service.ERROR.UNAUTHENTICATION);
        });
      } else {
        deferred.reject(service.ERROR.UNAUTHENTICATION);
      }

      return deferred.promise;
    }

    function getToken() {
      return _token;
    }

    function getUser() {
      return _user;
    }


    /*============== private ===============*/

    function refreshToken(token) {
      var deferred = $q.defer();

      $http
        .get(Config.API.URL + '/access_token/' + token)
        .then(function (response) {
          deferred.resolve({
            value: response.data.msg.access_token,
            expire: response.data.msg.access_token_expire_at
          });
        }, function (response) {
          deferred.reject(response.data.error_msg);
        });

      return deferred.promise;
    }
  }
})();
