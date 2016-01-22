(function() {
	'use strict';

	angular.module('app').controller('RegisterCtrl', ['$http','$auth',function($http,$auth) {
		var reg = this;
		reg.auth = $auth;
		reg.error = false;
		reg.ok = false;

		reg.cleanFields = function(user) {
			user.name = '';
			user.username = '';
			reg.password = '';
			reg.confirm = '';
		};

		if (reg.auth.currentUserRoles().indexOf('admin') === -1) {
			reg.isAdmin = false;
		} else {
			reg.isAdmin = true;
		}


		reg.go = function(user) {
			//guarantees a clean start when the previous attempt threw an error.
			reg.error = null;
			reg.ok = null;
			if (reg.confirm === reg.password) {
				user.password = reg.password;
			} else {
				reg.error = "The passwords do not match."
				reg.ok = false; //hides the success box
			}
			if (!reg.error) {
				user.roles = ['member','guest'];
				$http({
					method: 'POST',
					url: '/auth/register',
					headers: {
						Authorization: 'Bearer '+$auth.getToken()
					},
					data: user,
					}).then(function successCallback(response) {
						//got response, even if a bad one
						if (response.data.success) {
							//all went fine
							reg.error = false; //hides the error box
							reg.ok = response.data.message;
							reg.cleanFields(user);
						} else {
							//the request was good, but couldnt save the user
							reg.error = response.data.message;
							reg.ok = false; //hides the success box
						}
					}, function errorCallback(response) {
						// this is only called if status is not 200
						reg.error = response.data.message;
						reg.ok = false; //hides the success box
					});
			}
		};

	}]);
})();
