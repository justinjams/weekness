'use strict';

angular.module('WeeknessApp')
	.service('users', function users(db, authService, _, $rootScope, $http, $state) {
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
					month: 	'1',
					day: 	'1',
					year: 	'1900'
				},
				city: 'Lexington',
				state: 'KY',
				country: 'U.S.A.',
				gender: 'na',
				bio: '',
				role: 'anonymous'
			};
		}
		var $user = null;//anonymousUser();


		var update = function() {
			$http({method: 'GET', url: '/user'}).
  				success(function(data, status, headers, config) {
  					console.log('Found this user: ');
  					console.log(data);
  					if(data) {
				  		$user = data;
  					}
  					//console.log('nO!'+data);
				    // this callback will be called asynchronously
				    // when the response is available
				}).
				  error(function(data, status, headers, config) {
				  		console.err('Error updating');
				  		console.log(data);
				    // called asynchronously if an error occurs
				    //		 or server returns response with an error status.
				});
		}

		var profileFields = [
				'username',
				'name',
				'email',
				'city',
				'state',
				'country',
				'gender',
				'bio',
			];

		return {
			errors: $errors,
			update: function(){ update(); },
			get: function(conditions, callback) {
				db.User.query(conditions, {}, function(matches) {
					console.log(matches);
					callback(matches);
				});
			},
			user: {
				get: function (keyOrKeys) {
					if(!keyOrKeys) {
						return $user;
					} else {
						return _.pick($user, keyOrKeys);
					}
				},
				set: function (user) {
					$user = _.clone(user);
				},
				profile: function() {
					return _.pick($user, profileFields);
				}
			},
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
							$user = data;
						}
						console.log(data);
					}
					//users.update();
				// this callback will be called asynchronously
				// when the response is available
				}).
				error(function(data, status, headers, config) {
					console.log(data);
				// called asynchronously if an error occurs
				// or server returns response with an error status.
				});
			},
			logout: function() {
				$user = null;//anonymousUser();
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
	  						//console.log(data);
					  		//$user = data;
	  					}
					    // this callback will be called asynchronously
					    // when the response is available
					}).
					error(function(data, status, headers, config) {
	  					console.error("Unable to register");
					});
			}
		};
	});
