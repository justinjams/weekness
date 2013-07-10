'use strict';

angular.module('WeeknessApp')
  .controller('DebugCtrl', function ($scope, _, users) {
  	users.get({}, function(results){
  		$scope.debug_log = results;
  	console.log($scope.debug_lug);
  	});
  });
