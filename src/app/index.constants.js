(function() {
  'use strict';

  angular
    .module('shop')
    .constant('Config', {
      'WEB': {
        'SEPARATOR': '-'
      },
      'ROUTE': {
        'DEFAULT': 'home'
      },
      'API': {
        // 'URL': 'http://shop.com/index.php'
        'URL': 'https://wx.xinzhibang168.com/index.php'
      },
      'PATH': {
        'IMAGE': 'https://wx.xinzhibang168.com/mobile/images/',
        'ROOT': 'https://wx.xinzhibang168.com/mobile/'
      },
      'SECURITY': {
        'CACHEKEY': {
          'USERNAME': 'shop_username',
          'ACCESSTOKEN': 'shop_token',
          'REFRESHTOKEN': 'shop_rtoken'
        },
        'TOKEN_HEADER': 'X-Access-Token'
      },
      'PAYMENT': {
        'WECHAT': {
          'CODE': 'weixin',
          'URL': 'https://wx.xinzhibang168.com/mobile'
        }
      }
    });

})();
