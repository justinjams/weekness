'use strict';
var app = angular.module('WeeknessApp', ['mongolabResourceHttp'])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });

app.constant('MONGOLAB_CONFIG',{API_KEY:'jWN8q5zg3J6WX-eFGzq_cLZ8YzPitFT6', DB_NAME:'weekness'});

app.factory('User', function ($mongolabResourceHttp) {
    return $mongolabResourceHttp('users');
});