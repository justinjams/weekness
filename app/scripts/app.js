'use strict';

var app = angular.module('WeeknessApp', ['ui.state', 'underscore', 'http-auth-interceptor', 'ngCookies', 'ngResource', 'blueimp.fileupload', 'iso.directives', 'infinite-scroll'])
.config(function ($locationProvider, $stateProvider, $routeProvider, $httpProvider, fileUploadProvider) {
	$stateProvider
		.state('index', {
			url: '', // root route
			views: {
				'content': {
					templateUrl: 'views/browser.html',
					controller: 'BrowserCtrl'
				}
			}
		})
		.state('register', {
			url: '/register',
			views: {
				'content': {
					templateUrl: 'views/register.html',
					controller: 'RegisterCtrl'
				}
			}
		})
		.state('faker', {
			url: '/faker',
			views: {
				'content': {
					templateUrl: 'views/faker.html'
				}
			}
		})
		.state('login', {
			url: '/login',
			views: {
				'content': {
					templateUrl: 'views/login.html',
					controller: 'LoginCtrl'
				}
			}
		})
		.state('createWeekness', {
			url: '/create/weekness',
			views: {
				'content': {
					templateUrl: 'views/partials/weeknessForm.html',
					controller: 'WeeknessCreateCtrl'
				}
			}
		})
		.state('createDid', {
			url: '/create/did',
			views: {
				'content': {
					templateUrl: 'views/partials/didForm.html',
					controller: 'DidCreateCtrl'
				}
			}
		})
		.state('createTodo', {
			url: '/create/todo',
			views: {
				'content': {
					templateUrl: 'views/partials/todoForm.html',
					controller: 'TodoCreateCtrl'
				}
			}
		})
		.state('weekness', {
			url: '/weekness/:weekness',
			views: {
				'content': {
					templateUrl: 'views/weekness.html',
					controller: 'WeeknessViewCtrl'
				}
			}
		})
		.state('weeknessTodos', {
			url: '/weekness/:weekness/todo/:todo',
			views: {
				'content': {
					templateUrl: 'views/weekness.html',
					controller: 'WeeknessViewCtrl'
				}
			}
		})
		.state('weeknessTodosDids', {
			url: '/weekness/:weekness/todo/:todo/did/:did',
			views: {
				'content': {
					templateUrl: 'views/weekness.html',
					controller: 'WeeknessViewCtrl'
				}
			}
		})
		.state('weeknessTop', {
			url: '/weekness/:weekness/top',
			views: {
				'content': {
					templateUrl: 'views/weekness.html',
					controller: 'WeeknessViewCtrl'
				}
			}
		})
		.state('weeknessHistory', {
			url: '/weekness/:weekness/todos/history',
			views: {
				'content': {
					templateUrl: 'views/weekness.html',
					controller: 'WeeknessViewCtrl'
				}
			}
		})
		.state('weeknessNexts', {
			url: '/weekness/:weekness/todos/nexts',
			views: {
				'content': {
					templateUrl: 'views/weekness.html',
					controller: 'WeeknessViewCtrl'
				}
			}
		});

	//$routeProvider.when('/upload', {templateUrl: 'views/partials/fileUpload.html', controller: 'FileUploadCtrl'});

	$locationProvider.html5Mode(false).hashPrefix('');

	delete $httpProvider.defaults.headers.common['X-Requested-With'];
	angular.extend(fileUploadProvider.defaults, {
		// Enable image resizing, except for Android and Opera,
		// which actually support image resizing, but fail to
		// send Blob objects via XHR requests:
		disableImageResize: /Android(?!.*Chrome)|Opera/
		.test(window.navigator.userAgent),
		maxFileSize: 5000000,
		acceptFileTypes: /(\.|\/)(gif|jpe?g|png)$/i
	});
});
				/*
				$routeProvider
						.when('/', {
								templateUrl: 'views/main.html',
								controller: 'MainCtrl'
						})
						.when('/register', {
								templateUrl: 'views/register.html',
								controller: 'UsersCtrl'
						})
						.otherwise({
								redirectTo: '/'
						});
*/
//app.constant('MONGOLAB_CONFIG',{API_KEY:'jWN8q5zg3J6WX-eFGzq_cLZ8YzPitFT6', DB_NAME:'weekness'});
app.constant('uploadUrl', 'http://localhost:8888');
