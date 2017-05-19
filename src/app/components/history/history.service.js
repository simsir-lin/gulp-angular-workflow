(function () {
  'use strict';

  angular
    .module('shop')
    .service('HistoryService', HistoryService);

  function HistoryService(
    $window,
    $state,
    Config
  ) {
    var service = {};
    var _list = [{
      name: Config.ROUTE.DEFAULT,
      params: {}
    }];

    service.back = back;
    service.push = push;
    service.reset = reset;

    return service;

    function back() {
      if ($state.current.data.parent) {
        $state.go($state.current.data.parent);
        return;
      }
      if (_list.length === 1) {
        $state.go(_list[0].name, _list[0].params);
      } else {
        // $window.history.back();
        var pre = _list.pop();
        $state.go(pre.name, pre.params);
      }
    }

    function push(name, params) {
      _list.push({
        name: name,
        params: params
      });
    }

    function reset(route, params) {
      _list = [{
        name: route || Config.ROUTE.DEFAULT,
        params: params || {}
      }];
    }
  }
})();
