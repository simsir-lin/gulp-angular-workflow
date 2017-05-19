(function () {
  'use strict';

  angular
    .module('shop')
    .directive('infiniteScroll', infiniteScroll);

  function infiniteScroll(
    $window,
    $timeout
  ) {
    var timer;

    return {
      restrict: 'E',
      template: '<div class="bottom-tip text-center" ng-if="enabled"><span><i class="fa fa-spinner fa-spin"></i>&nbsp;加载中...</span></div>',
      scope: {
        onInfinite: '&',
        enabled: '='
      },
      link: postLink
    };

    function postLink(scope, ele) {
      var fontsize = document.documentElement.style.fontSize;
      var px = parseInt(fontsize.substr(0, fontsize.length-2));
      scope.selfHeight = px*0.14;

      $window.addEventListener('scroll', onScroll);

      scope.$watch(function () {
        return scope.enabled;
      }, function (newValue) {
        if (!newValue) {
          unScroll();
        } else {
          $window.addEventListener('scroll', onScroll);
        }
      });

      function onScroll() {
        if (timer) {
          $timeout.cancel(timer);
        }
        var contentHeight = $window.scrollY + $window.innerHeight - scope.selfHeight;
        var offsetTop = ele[0].offsetTop;

        if (contentHeight > offsetTop) {
          if (scope.onInfinite) {
            timer = $timeout(function() {
                scope.onInfinite();
            }, 500);
          }
        }
      }

      function unScroll() {
        if (timer) {
          $timeout.cancel(timer);
        }
        $window.removeEventListener('scroll', onScroll);
      }

      scope.$on('$destroy', function () {
        unScroll();
      });

      scope.$on("infiniteScroll.complete", function() {
        scope.enabled = false;
      });
    }
  }

})();
