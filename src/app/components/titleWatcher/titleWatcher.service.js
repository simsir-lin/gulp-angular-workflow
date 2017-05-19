(function () {
  'use strict';

  angular
    .module('shop')
    .service('TitleWatcherService', TitleWatcherService);

  function TitleWatcherService(
    $rootScope,
    $window,
    $state,
    Config
  ) {
    var isPush = false;
    var service = {};
    service.watch = watch;
    service.pushTitle = pushTitle;

    function watch() {
      $rootScope.$new().$on('$stateChangeSuccess', function (event, toState) {
        if (isPush) {
          isPush = false;
          return;
        }
        
        var currentTitle;

        if ('data' in toState && toState.data.title) {
          currentTitle = toState.data.title;
        }

        $window.document.title = currentTitle;
      });
    }

    function pushTitle(text) {
      isPush = true;
      if ($state.current.data.title) {
        $window.document.title = text + ' ' + Config.WEB.SEPARATOR + ' ' + $state.current.data.title;
      } else {
        $window.document.title = text;
      }
    }

    return service;
  }
})();
