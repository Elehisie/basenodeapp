(function() {
	'use strict';

	angular.module('app').controller('LoginCtrl', ['$http','$location','$auth',function($http,$location, $auth) {
		var login = this;
		login.auth = $auth;
	}]);

})();
