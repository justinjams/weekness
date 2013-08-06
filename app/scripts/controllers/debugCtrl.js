'use strict';

angular.module('WeeknessApp')
.controller('DebugCtrl', function ($scope, _, users) {
	users.get({}, function(results){
		$scope.debugLog = results;
		console.log($scope.debugLug);
	});
});
