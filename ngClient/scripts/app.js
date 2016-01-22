(function () {
  'use strict';

  angular.module('app', ['ngRoute','ngMaterial','ngMdIcons']);
  angular.module('app').config(function($mdThemingProvider) {
    $mdThemingProvider.definePalette('CornFlowerBlue', {
      '50': 'ff00ff',
      '100': 'ffcdd2',
      '200': 'ef9a9a',
      '300': 'e57373',
      '400': 'ef5350',
      '500': '6495ed', //primary
      '600': 'e53935',
      '700': 'd32f2f',
      '800': 'c62828',
      '900': 'b71c1c',
      'A100': 'ff8a80',
      'A200': 'ff5252',
      'A400': 'ff1744',
      'A700': 'd50000',

      'contrastDefaultColor': 'light',    // whether, by default, text (contrast)
                                          // on this palette should be dark or light
      'contrastDarkColors': ['50', '100', //hues which contrast should be 'dark' by default
       '200', '300', '400', 'A100'],
      'contrastLightColors': ['500']    // could also specify this if default was 'dark'
    });

    $mdThemingProvider.theme('default')
      .primaryPalette('CornFlowerBlue')
    });

  angular.module('app').config(['$routeProvider',function($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/home.html'
      })
      .when('/home', {
        templateUrl: 'views/home.html'
      })
      .when('/login', {
        templateUrl: 'views/login/login.html',
        controller: 'LoginCtrl as login'
      })
      .when('/register', {
        templateUrl: 'views/register/register.html',
        controller: 'RegisterCtrl as reg',
//        resolve: {
//          checkLogin: function($auth,$location){
//            if (!$auth.isLoggedIn()) { $location.path('/authError'); };
//          }
//        },
      })
      .when('/profile', {
        templateUrl: 'views/profile/profile.html',
        controller: 'ProfileCtrl as me',
        resolve: {
          checkLogin: function($auth,$location){
            if (!$auth.isLoggedIn()) { $location.path('/authError'); };
          }
        },
      })
      .when('/logout', {
        resolve: {
          logout: function($auth,$location) {
            if ($auth.isLoggedIn()) {
              $auth.destroySession();
              $location.path('/login');
            } else {
              $location.path('/login');
            }
          }
        }
      })
      .when('/authError', {
        templateUrl: 'views/error/authError.html'
      })
      .when('/404', {
        templateUrl: 'views/error/404.html'
      })
      .otherwise({
        redirectTo: '/404'
      })
  }]);

})();
