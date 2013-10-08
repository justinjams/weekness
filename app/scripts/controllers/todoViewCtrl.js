'use strict';

angular.module('WeeknessApp')
.controller('TodoViewCtrl', function ($rootScope, $scope, $stateParams, api, _) {

	$scope.update = function() {
		api.todos.get($scope.params, function(results) {
			$scope.todos = results;
		});
	}

	$scope.vote = function() {
		var voteInfo = {
			todo: $scope.todo.slug,
			weekness: $scope.todo.weekness,
			generation: $scope.todo.generation
		}
		api.user.addVote(voteInfo);
	}

	$scope.params = {
		weekness: $stateParams.weekness
	};
	//$scope.postData = {};

	if($stateParams.todos) {
		switch($stateParams.todos.toLowerCase()) {
			case 'nexts':
				api.weeknesses.get({name: $scope.params.weekness}, function(results) {
					$scope.params.generation = parseInt(results[0].generation,10)+1;
					$scope.update();
				});
			break;
		}
	}
});
