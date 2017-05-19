(function() {
  'use strict';

  angular
    .module('shop')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig(
    $stateProvider,
    $urlRouterProvider,
    Config
  ) {

    $stateProvider
    .state('home', {
      url: "/",
      data: {
        title: '首页'
      },
      views: {
        'nav-content': {
          templateUrl: "app/home/home.html",
          controller: 'HomeController',
          controllerAs: 'home',
        }
      }
    })
    .state('category', {
      url: "/category",
      data: {
        title: '所有分类'
      },
      views: {
        'nav-content': {
          templateUrl: "app/category/category.html",
          controller: 'CategoryController',
          controllerAs: 'category',
        }
      }
    })
    .state('shoppingCart', {
      url: "/shoppingCart",
      data: {
        title: '购物车'
      },
      views: {
        'nav-content': {
          templateUrl: "app/shoppingCart/shoppingCart.html",
          controller: 'ShoppingCartController',
          controllerAs: 'shoppingCart',
        }
      },
      resolve: {
        token: userAuthenticatedResolve
      }
    })

    .state('products', {
      url: "/products?keyword&cid&typeid",
      templateUrl: "app/products/products.html",
      controller: 'ProductsController',
      controllerAs: 'products',
      data: {
        title: '商品列表'
      },
      params: {
        keyword: null,
        cid: null,
        typeid: null
      }
    })
    .state('product', {
      url: "/products/{id}",
      templateUrl: "app/products/product.html",
      controller: 'ProductController',
      controllerAs: 'product',
      data: {
        title: '商品详情'
      }
    })

    .state('login', {
      url: "/login",
      templateUrl: "app/security/login/login.html",
      controller: 'LoginController',
      controllerAs: 'login',
      data: {
        title: '登录'
      },
      params: {
        backRoute: Config.ROUTE.DEFAULT,
        backRouteParams: {}
      }
    })
    .state('register', {
      url: "/register",
      templateUrl: "app/security/register/register.html",
      controller: 'RegisterController',
      controllerAs: 'register',
      data: {
        title: '注册',
        parent: 'login'
      }
    })

    // shopping flow
    .state('confirmOrder', {
      url: "/confirmOrder",
      templateUrl: "app/shopping/confirmOrder.html",
      controller: 'ConfirmOrderController',
      controllerAs: 'confirmOrder',
      data: {
        title: '订单确认'
      },
      resolve: {
        token: userAuthenticatedResolve
      },
      params: {
        address: null,
        list: null
      }
    })
    .state('setComment', {
      url: "/setComment/{id}",
      templateUrl: "app/shopping/setComment.html",
      controller: 'SetCommentController',
      controllerAs: 'setComment',
      data: {
        title: '订票评价',
      },
      resolve: {
        token: userAuthenticatedResolve
      }
    })
    .state('wechatPay', {
      url: "/wechatPay",
      templateUrl: "app/shopping/wechatPay.html",
      controller: 'WechatPayController',
      controllerAs: 'wechatPay',
      data: {
        title: '微信支付',
        parent: 'userOrders'
      },
      params: {
        id: null
      },
      resolve: {
        token: userAuthenticatedResolve
      }
    })

    // UserCenter
    .state('userCenter', {
      url: "/userCenter",
      data: {
        title: '个人中心'
      },
      views: {
        'nav-content': {
          templateUrl: "app/userCenter/userCenter.html",
          controller: 'UserCenterController',
          controllerAs: 'userCenter',
        }
      },
      resolve: {
        token: userAuthenticatedResolve
      }
    })
    .state('userOrders', {
      url: "/userCenter/orders",
      templateUrl: "app/userCenter/orders/orders.html",
      controller: 'UserOrdersController',
      controllerAs: 'orders',
      data: {
        title: '我的订单',
        parent: 'userCenter'
      },
      params: {
        state: null
      },
      resolve: {
        token: userAuthenticatedResolve
      }
    })
    .state('userOrder', {
      url: "/userCenter/orders/{id}",
      templateUrl: "app/userCenter/orders/order.html",
      controller: 'UserOrderController',
      controllerAs: 'order',
      data: {
        title: '订单详情',
        parent: 'userOrders'
      },
      resolve: {
        token: userAuthenticatedResolve
      }
    })
    .state('userFavorite', {
      url: "/userCenter/favorite",
      templateUrl: "app/userCenter/favorite/favorite.html",
      controller: 'UserFavoriteController',
      controllerAs: 'userFavorite',
      data: {
        title: '收藏夹'
      },
      resolve: {
        token: userAuthenticatedResolve
      }
    })
    .state('userProfile', {
      url: "/userCenter/profile",
      templateUrl: "app/userCenter/profile/profile.html",
      controller: 'UserProfileController',
      controllerAs: 'userProfile',
      data: {
        title: '个人资料'
      },
      resolve: {
        token: userAuthenticatedResolve
      }
    })
    .state('userAddresses', {
      url: "/userCenter/addresses",
      templateUrl: "app/userCenter/address/addresses.html",
      controller: 'UserAddressesController',
      controllerAs: 'userAddresses',
      data: {
        title: '我的收货地址',
        parent: 'userCenter'
      },
      resolve: {
        token: userAuthenticatedResolve
      }
    })
    .state('userAddress', {
      url: "/userCenter/addresses/{id}",
      templateUrl: "app/userCenter/address/address.html",
      controller: 'UserAddressController',
      controllerAs: 'userAddress',
      data: {
        title: '管理收货地址'
      },
      params: {
        address: null,
        cart: null
      },
      resolve: {
        token: userAuthenticatedResolve
      }
    })
    .state('userPassword', {
      url: "/userCenter/password",
      templateUrl: "app/userCenter/password/password.html",
      controller: 'UserPasswordController',
      controllerAs: 'userPassword',
      data: {
        title: '修改密码'
      },
      resolve: {
        token: userAuthenticatedResolve
      }
    });

    $urlRouterProvider.otherwise("/");

    // Resolve
    function userAuthenticatedResolve(SecurityService) {
      return SecurityService.userAuthenticatedPromise();
    }
  }
})();
