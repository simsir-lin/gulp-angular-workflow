(function () {
  'use strict';

  angular
    .module('shop')
    .service('HttpService', HttpService);

  function HttpService(
    $q,
    $http,
    Config
  ) {
    var service = {};

    service.get = get;
    service.post = post;
    service.put = put;
    service.delete = function(api) {
      return request('DELETE', api, {}, {});
    };

    return service;

    function get(api) {
      return request('GET', api, {}, {});
    }

    function post(api, params) {
      return request('POST', api, {}, params || {});
    }

    function put(api, params) {
      return request('PUT', api, {}, params || {});
    }

    function request(method, api, params, data) {
      var defered = $q.defer();

      $http({
        method: method,
        url: Config.API.URL + api,
        params: params,
        data: data
      }).then(function (response) {
        if (response.status === 200 || response.status === 204) {
          if (response.data.status === 1) {
            defered.resolve(response);
          } else {
            defered.reject(getErrorMsg(response));
          }
        } else {
          defered.reject(getErrorMsg(response));
        }
      }, function (response) {
        if (response.data) {
          if (response.data.error_code === 100002) {
            // TODO: 重新登录
            defered.reject('请重新登录');
            // console.log($state);
            // console.log($stateParams);
          } else {
            defered.reject(getErrorMsg(response));
          }
        } else {
          defered.reject(getErrorMsg(response));
        }
      });

      return defered.promise;
    }

    function getErrorMsg(response) {
      if (!response.data) {
        return Config.MESSAGE.FAIL;
      }
      if (response.data.error_msg) {
        return response.data.error_msg;
      }
      if (response.data.msg) {
        return response.data.msg;
      }
      return Config.MESSAGE.FAIL;
    }

  }
})();
