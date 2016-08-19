(function() {
  'use strict';

  describe('Controller HomeController', function() {
    var $controller;

    beforeEach(function () {
      module("myApp");

      inject(function(
        _$controller_
      ) {
        $controller = _$controller_;
      });
    });

    it('should defined controller', function () {
      var controller = $controller('HomeController');
      expect(controller).not.toBeNull();
    });
  });
})();
