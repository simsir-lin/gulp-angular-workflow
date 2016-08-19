(function() {
  'use strict';

  angular
    .module('myApp')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig(
    $stateProvider,
    $urlRouterProvider
  ) {
    $urlRouterProvider.otherwise("/");

    $stateProvider
      .state('home', {
        url: "/",
        templateUrl: "app/home/home.html",
        controller: 'HomeController',
        controllerAs: 'home'
      });
    }
})();
