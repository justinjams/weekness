'use strict';

angular.module('WeeknessApp')
  .controller('LoginCtrl', function ($scope, users, $state) {
    $scope.user = {username: '', password: '', role: 'anonymous'};
				$scope.authenticate = function(e) {
					users.authenticate(e.target.form[0].value, e.target.form[1].value);
				};

				$scope.$on('authentication', function(e, response) {
			    	$scope.authError = response;
			    	if(response == 'available')
									$state.transitionTo('register');
				});

			 $scope.$on('event:auth-loginConfirmed', function() {
			   $scope.user = users.user.get();
			   console.log(users.user.get());
 			});
});
