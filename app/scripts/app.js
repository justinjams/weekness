'use strict';
var app = angular.module('WeeknessApp', ['mongolabResourceHttp', 'ui.state'])
  .config(function ($locationProvider, $stateProvider, $routeProvider) {
    $stateProvider
      .state('index', {
          url: "", // root route
          views: {
              "content": {
                templateUrl: 'views/main.html',
                controller: 'MainCtrl'
              },
              "users": {
                  templateUrl: "views/users.html",
                  controller: 'UsersCtrl'
              }
          }
      })
      .state('register', {
          url: "/register",
          views: {
              "content": {
                templateUrl: 'views/register.html',
                controller: 'UsersCtrl'
              },
              "users": {
                  templateUrl: "views/users.html",
                  controller: 'UsersCtrl'
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
