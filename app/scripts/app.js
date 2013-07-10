'use strict';
var app = angular.module('WeeknessApp', ['ui.state', 'underscore', 'http-auth-interceptor', 'ngCookies', 'ngResource', 'mongolabResourceHttp'])
  .config(function ($locationProvider, $stateProvider, $routeProvider, $httpProvider) {
    $stateProvider
      .state('index', {
          url: "", // root route
          views: {
              "content": {
                templateUrl: 'views/main.html',
                controller: 'MainCtrl'
              }
          }
      })
      .state('main', {
          url: "/", // root route
          views: {
              "content": {
                templateUrl: 'views/main.html',
                controller: 'MainCtrl'
              }
          }
      })
      .state('register', {
          url: "/register",
          views: {
              "content": {
                templateUrl: 'views/register.html',
                controller: 'RegisterCtrl'
              }
          }
      })
      .state('contrib', {
          url: "/contrib",
          views: {
              "content": {
                templateUrl: 'views/contrib.html',
                controller: 'ContribCtrl'
              }
          }
      });

  $locationProvider.html5Mode(false).hashPrefix('');
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
app.constant('MONGOLAB_CONFIG',{API_KEY:'jWN8q5zg3J6WX-eFGzq_cLZ8YzPitFT6', DB_NAME:'weekness'});
