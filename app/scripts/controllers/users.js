'use strict';

angular.module('WeeknessApp')
  .controller('UsersCtrl', function ($scope, User, $location, $route, $cookies) {
  	$scope.authError = 'no-error';
  	$scope.user = {
  		username : '',
  		password : '',
  		email : '',
  		age : '',
  		city : '',
  		state : '',
  		country : '',
  		sex : '',
  		bio : '',
  		role : '',
  		};
   $scope.roles = ['anonymous', 'user'];
  	$scope.role = $scope.roles[0];

  // 	User.all(function(users){
  // 		$.each(users, function() {
  // 			console.log(this);
  // 		});
  // });

  	$scope.authenticate = function() {
  		var waiting = true;
  		User.query({
  			username : $scope.user.username
  		}, {}, function(matches) {
  			if(matches.length>0) {
  				console.log(matches);
	  			User.query({
	  				username : $scope.user.username,
	  				password : $scope.user.password
	  			}, {}, function(matches) {
	  				if(matches.length>0) {
	  					$scope.authError = 'correct';
        authService.loginConfirmed();
	  				} else {
	  					$scope.authError = 'invalid';
	  				}
	  				waiting = false;
	  			});
	  		} else {
	  			$scope.authError = 'available';
	  			waiting = false;
	  		}
  		});
  		console.log($scope.authError);
  	};

  	$scope.create = function() {
  		$scope.user.role = $scope.roles[1];
  		var user = new User($scope.user);
  		user.$save(function(response){
     $location.path('');
     $route.reload();
  			console.log(response)
  			console.log('Saved to server');
  		});
  	}

  	$scope.getNumber = function(num) {
  		return new Array(num);
  	}
  });
