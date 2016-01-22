(function () {
  'use strict';

  angular.module('app').factory('$user',['$auth','$http', function($auth,$http) {
    var $user = {
      found: null,
      findOne: function(id) {
        //finds a single user by id.
        console.log('yes ill find the user for id: '+id);
        $http({
          method: 'GET',
          url: '/auth/users/'+id,
          headers: {
						Authorization: 'Bearer '+$auth.getToken()
					},
        }).then(function successCallback(response) {
          if (response.data.success) {
            $user.found = response.data.user;
            console.log($user.found);
          } else {
            //the request was good, but couldnt find user
            $auth.error = response.data.message;
          }

        }, function errorCallback(response) {
          // this is only called if status is not 200
          console.log('nope'+response.data);
          $auth.error = response;
        });
        return $user.found;
      },

      findAll: function() {
        //returns a list of users.
      },
    };

    return $user;
  }]);

})();
