'use strict';

angular.module('WeeknessApp')
	.controller('LoginCtrl', function ($scope, api, $state) {
				$scope.errors = [];
				$scope.user = api.user.get();
				$scope.login_or_first_name = 'Login';
				$scope.$watch( function() { return api.user.get(); }, function (oldVal, newVal) {
					$scope.user = api.user.get();
					if($scope.user) {
						$scope.login_or_first_name = $scope.user.name.first;
					} else {
						$scope.login_or_first_name = 'Login';
					}
				}, true);

				$scope.$watch( function() { return api.user.errors; }, function () {
					$scope.errors = api.user.errors;
				}, true);

				$scope.login = function(e) {
					api.user.login(e.target.form[0].value, e.target.form[1].value);
				};

				$scope.logout = function() {
					api.user.logout();
				};

				$scope.fbLogin = function() {
					$state.transitionTo('fbLogin');
				};

				$scope.$on('login-error', function(event, errors) {
					$scope.errors = errors;
				});

			});
