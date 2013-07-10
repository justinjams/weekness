'use strict';

angular.module('WeeknessApp')
    .factory('db', function($mongolabResourceHttp) {
        var db = {};
        db.User = $mongolabResourceHttp('users');
        db.Contrib = $mongolabResourceHttp('contrib');
		// AngularJS will instantiate a singleton by calling "new" on this function
		return db;
    });
