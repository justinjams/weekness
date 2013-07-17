'use strict';

angular.module('WeeknessApp')
	.service('users', function users(db, authService, _, $rootScope) {
		var $error = '';
		var $user = {
			username : undefined,
			password : undefined,
			email : undefined,
			age : undefined,
			city : undefined,
			state : undefined,
			country : undefined,
			sex : undefined,
			bio : undefined,
			role : undefined,
		};

		return {
			error: $error,
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
				}
			},
			authenticate: function(username, password) {
				$user.username = username;
				db.User.query({
					username : username
				}, {}, function(matches) {
					console.log(matches);
					if(matches.length>0 && password) {
						db.User.query({
							username : username,
							password : password
						}, {}, function(matches) {
							if(matches.length>0) {
								$error = 'correct';
								$user = _.clone(matches[0]);
								authService.loginConfirmed();
							} else {
								$error = 'invalid';
							}
							$rootScope.$broadcast('authentication', $error);
						});
					} else if(matches.length === 0) {
						$error = 'available';
					} else {
						$error = 'taken';
					}
					$rootScope.$broadcast('authentication', $error);
				});
			},
			create: function(user) {
				db.User.save(user, {}, function(e){
					authService.loginConfirmed();
					console.log('Created account for '+user.username);
					console.log(e);
				});
			}
		};
	});
