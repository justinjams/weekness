'use strict';

angular.module('WeeknessApp')
  .controller('LoginCtrl', function ($scope, users, $state, $http) {
  	$scope.errors = [];
    $scope.user = users.user.get();

    $scope.$watch( function() { return users.user.get();}, function (data) {
    		$scope.user = users.user.get();
  		}, true);

    $scope.$watch( function() { return users.errors;}, function (data) {
    		$scope.errors = users.errors;
  		}, true);

	$scope.login = function(e) {
		users.login(e.target.form[0].value, e.target.form[1].value);
		//users.authenticate(e.target.form[0].value, e.target.form[1].value);
		//$http.defaults.headers.get['Content-Type']='application/x-www-form-urlencoded';
	};

	$scope.logout = function() {
		users.logout();
	}

	$scope.fbLogin = function() {
		$state.transitionTo('fbLogin');
	}

	$scope.update = function() {
		users.update();
	}

	$scope.$on('login-error', function(event, errors) {
		$scope.errors = errors;
	});
/*
	$scope.$on('authenticated', function(event, user) {
		$scope.errors = [];
		$scope.user = user
	});*/

	users.update();
});
