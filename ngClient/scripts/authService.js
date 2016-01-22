(function() {
	'use strict';

	// angular.module('ngServices', []);

	angular.module('app').factory('$auth', ['$location','$http','$window',
	function($location, $http, $window){
		var $auth = {
			isLoggedIn: function() {
				var token = $auth.getToken();
				if (token) {
					var params = $auth.parseJwt(token);
					return Math.round(new Date().getTime() / 1000) <= params.exp;
				} else {
					return false;
				}
			},
			getId: function() {
				var token = $auth.getToken();
				if (token) {
					var params = $auth.parseJwt(token);
					return params._id;
				} else {
					return 'No Token Found';
				}
			},
			currentUser: function() {
				var token = $auth.getToken();
				if (token) {
					var params = $auth.parseJwt(token);
					//I have to split() here cuz it's a long full name, with a space in between
					return params.name;
				} else {
					return 'Stranger';
				}
			},
			error: null,
			go: function(user) {
				$http({
					method: 'POST',
					url: '/auth/login',
					data: user,
					}).then(function successCallback(response) {
						//got response, even if a bad one
						if (response.data.success) {
							//save token, change currentUser, redirect, whatever
							$auth.saveToken(response.data.token);
							$location.path('/profile');
							$auth.error = false; //hides the error box
						} else {
							//the request was good, but couldnt log in
							$auth.error = response.data.message;
						}
					}, function errorCallback(response) {
						// this is only called if status is not 200
						$auth.error = response.data.message;
					});
			},
			currentUserRoles: function() {
				var token = $auth.getToken();
				if (token) {
					var params = $auth.parseJwt(token);
					return params.roles;
				} else {
					return 'Stranger';
				}
			},
			destroySession: function() {
				$window.localStorage.removeItem('meSchedulerToken');
			},
			parseJwt: function(token) {
			  var base64Url = token.split('.')[1];
			  var base64 = base64Url.replace('-', '+').replace('_', '/');
			  return JSON.parse($window.atob(base64));
			},
			saveToken: function(token) {
				$window.localStorage['meSchedulerToken'] = token;
			},
			getToken: function(token) {
				return $window.localStorage['meSchedulerToken'];
			},
		};
		return $auth;
	}]);



})();
