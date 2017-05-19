(function() {
    'use strict';

    angular
        .module('shop')
        .service('SecurityInterceptor', SecurityInterceptor);

    function SecurityInterceptor(
        $injector,
        Config
    ) {
        var interceptor = {};
        var SecurityService;

        interceptor.request = request;
        // interceptor.response = response;
        // interceptor.responseError = responseError;

        return interceptor;

        function request(config) {
            if (config.url.indexOf(Config.API.URL) >= 0) {
                SecurityService = $injector.get('SecurityService');
                if (SecurityService.getToken().isValid()) {
                  config.headers[Config.SECURITY.TOKEN_HEADER] = SecurityService.getToken().get();
                }
            }
            return config;
        }

        // function response(response) {
        //   console.log(response);
        //
        //   return response;
        // }

        // function responseError(response) {
        //   if (!response.data) {
        //     response.data = {
        //       error_message: Config.MESSAGE.FAIL
        //     };
        //   } else {
        //     if (response.data.error_code === 100002) {
        //       state = $injector.get('$state');
        //       var stateParams = $injector.get('$stateParams');
        //       var id = stateParams.id;
        //       state.go('login', {
        //         backRoute: state.current.name,
        //         backRouteParams: {
        //           id: id
        //         }
        //       });
        //     }
        //   }

          // return response;
        // }
    }
})();
