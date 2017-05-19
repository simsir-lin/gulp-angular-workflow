(function() {
  'use strict';

  angular
    .module('shop')
    .config(config);

  /** @ngInject */
  function config(
    $httpProvider,
    toastrConfig
  ) {
    $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
    $httpProvider.defaults.headers.put['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';

    // 设置x-requested-with 请求头, 宁服务器端判定为ajax请求;
    // $httpProvider.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";

    // 请求时判断数据是否为object或数组， 如果是则将对象序列化；
    $httpProvider.defaults.transformRequest = function (data) {
      return angular.isObject(data) && String(data) !== '[object File]' ? convertData(data) : data;
    };

    $httpProvider.interceptors.push('SecurityInterceptor');

    toastrConfig.allowHtml = true;
    toastrConfig.timeOut = 3000;
    toastrConfig.preventDuplicates = true;
    toastrConfig.progressBar = true;
    toastrConfig.preventDuplicates = false;
    toastrConfig.positionClass = 'toast-top-center';

    function convertData(data) {
      var res = '';
      for (var key in data){
        res += key + '=' + data[key] + '&';
      }
      return res.substr(0, res.length-1);
    }
  }
})();
