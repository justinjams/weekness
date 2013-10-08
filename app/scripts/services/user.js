/*jshint unused: false */
/*global $ */
'use strict';

angular.module('WeeknessApp')
.service('user', function user(db, authService, _, $rootScope, $http) {
	var $errors = [];
	var anonymousUser = function() {
		return {
			username: 'anonymous',
			password: 'p',
			name: {
				first: 'anony',
				last: 'mouse'
			},
			email: 'gweekness@gmail.com',
			birthday: {
				month: '1',
				day: '1',
				year: '1900'
			},
			city: 'Lexington',
			state: 'KY',
			country: 'U.S.A.',
			gender: 'na',
			bio: '',
			role: 'anonymous'
		};
	};

	var current = null;

	var refresh = function() {
		$http({method: 'GET', url: '/user'}).
		success(function(data, status, headers, config) {
			console.log('Found this user: ');
			console.log(data);
			if(data) {
				current = data;
			}
		}).
		error(function(data, status, headers, config) {
			console.err('Error updating');
			console.log(data);
		});
	};

	var profileFields = [
		'username',
		'name',
		'email',
		'city',
		'state',
		'country',
		'gender',
		'bio'
	];

	refresh();

	return {
		get: function() {return current;},
		errors: $errors,
		refresh: function(){ refresh(); },
		avail: function(attributes) {
			$http({
				method: 'POST',
				url: '/available',
				data: attributes
			}).
			success(function(data, status, headers, config) {
				// this callback will be called asynchronously
				// when the response is available
				console.log(data);
				if(data === 'true') {
					$rootScope.$broadcast('available');
				}
			});
		},
		login: function(email, password) {
			console.log(password);
			$http({
				method: 'POST',
				url: '/login',
				data: $.param({
					email: email,
					password: password
				}),
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded'
				}
			}).
			success(function(data, status, headers, config) {
				if(data) {
					if(_.isArray(data)) {
						//$rootScope.$broadcast('login-error', data);
						$errors = data;
					}
					else {
						current = data;
					}
					console.log(current);
				}
				// this callback will be called asynchronously
				// when the response is available
			}).
			error(function(data, status, headers, config) {
				// called asynchronously if an error occurs
				// or server returns response with an error status.
			});
		},
		addVote: function(voteInfo) {
			$http({method:'POST', url: '/vote', data: voteInfo}).
			success(function(data, status, headers, config) {
				console.log(status);
				console.log(data);
			});
		},
		logout: function() {
			current = null;

			$http({method:'GET', url: '/logout'}).
			success(function(data, status, headers, config) {
				$errors = ['Successfully logged out'];
				$rootScope.$broadcast('authenticated', anonymousUser());
			});
		},
		register: function(user) {
			console.log(user);
			$http({method: 'POST', url: '/register', data: user}).
			success(function(data, status, headers, config) {
				if(data) {
					$rootScope.$broadcast('authenticated', data);
				}
    // this callback will be called asynchronously
    // when the response is available
			}).
			error(function(data, status, headers, config) {
				console.error('Unable to register');
			});
		}
	};
});
/*jshint unused: true */