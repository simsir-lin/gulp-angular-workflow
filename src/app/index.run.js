(function() {
  'use strict';

  angular
    .module('shop')
    .run(runBlock);

  /** @ngInject */
  function runBlock(
    $rootScope,
    $location,
    $window,
    $state,
    SecurityService,
    HistoryService,
    TitleWatcherService,
    CommonService,
    toastr
  ) {
    // 设置在iPhone6 plus 下 1rem == 100px
    document.documentElement.style.fontSize = parseInt(window.innerWidth/4.14) + 'px';

    TitleWatcherService.watch();
    SecurityService.userAuthenticatedPromise();

    $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
      if (toState.name === 'product') {
        CommonService.scrollTop();
      }

      if (fromState.name && fromState.name != 'login' && fromState.name != 'confirmOrder') {
        HistoryService.push(fromState.name, fromParams);
      }
    });

    $rootScope.$on('$stateChangeError', function (event, toState, toParams, fromState, fromParams, error) {
      if (error === SecurityService.ERROR.UNAUTHENTICATION) {
        toastr.info('请先登录');
        HistoryService.reset();
        $state.go('login', {
          backRoute: toState.name
        });
      }
    });
  }
})();
