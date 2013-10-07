'use strict';

angular.module('WeeknessApp')
.controller('TodosViewCtrl', function ($rootScope, $scope, $stateParams, api, _) {

	$scope.update = function() {
		api.todos.find($scope.params, function(results) {
			console.log(results);
			console.log($scope.params);
		});
	}

	$scope.params = {
		weekness: $stateParams.weekness
	};
	//$scope.postData = {};

	if($stateParams.todos) {
		switch($stateParams.todos.toLowerCase()) {
			case 'nexts'://{'age': {'$lt":5, '$gt':3}}
				api.weeknesses.get({name: $scope.params.weekness}, function(results) {
					$scope.params.generation = {$gte:results[0].generation};
					$scope.update();
				});
			break;
		}
	}
});
