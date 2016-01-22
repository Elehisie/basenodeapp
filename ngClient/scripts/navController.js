(function() {
  'use strict';

  angular.module('app').controller('navController',['$auth','$mdSidenav', function($auth,$mdSidenav) {
    var nav = this;
    nav.auth = $auth;

    // nav.username = nav.auth.currentUser().split(' ')[0];

    //material menu
    nav.toggleSidenav = function(menuId) {
      $mdSidenav(menuId).toggle();
    };
  }]);

})();
