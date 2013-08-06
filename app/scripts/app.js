'use strict';

var app = angular.module('WeeknessApp', ['ui.state', 'underscore', 'http-auth-interceptor', 'ngCookies', 'ngResource', 'blueimp.fileupload', 'iso.directives'])
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
		.state('contrib', {
			url: '/contrib',
			views: {
				'content': {
					templateUrl: 'views/contribForm.html',
					controller: 'ContribCtrl'
				}
			}
		})
		.state('faker', {
			url: '/faker',
			views: {
				'content': {
					templateUrl: 'views/faker.html',
					controller: 'ContribCtrl'
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
			url: '/create',
			views: {
				'content': {
					templateUrl: 'views/weeknessForm.html',
					controller: 'WeeknessCreateCtrl'
				}
			}
		})
		.state('weekness', {
			url: '/weekness',
			views: {
				'content': {
					templateUrl: 'views/weekness.html'
				}
			}
		})
		.state('weeknesses', {
			url: '/weekness/:weekness',
			views: {
				'content': {
					templateUrl: 'views/weekness.html'
				}
			}
		})
		.state('weeknessesDos', {
			url: '/weekness/:weekness/do/:do',
			views: {
				'content': {
					templateUrl: 'views/weekness.html'
				}
			}
		})
		.state('weeknessesDosDids', {
			url: '/weekness/:weekness/do/:do/did/:did',
			views: {
				'content': {
					templateUrl: 'views/weekness.html'
				}
			}
		});

	$routeProvider.when('/upload', {templateUrl: 'views/partials/fileUpload.html', controller: 'FileUploadCtrl'});


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
