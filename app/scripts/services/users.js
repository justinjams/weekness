'use strict';

angular.module('WeeknessApp')
  .factory('User', function ($mongolabResourceHttp) {
    return $mongolabResourceHttp('users');
  });
