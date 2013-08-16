'use strict';

angular.module('WeeknessApp')
.controller('FakerCtrl', function ($scope, $rootScope, _, api) {


	$scope.fakin = { count: 0};

	var random = function(possible) {
		return possible[Math.floor(Math.random()*possible.length)];
	};

	$scope.types = [
		{
			name: 'todos',
			showField: function() {
				if(!$scope.fakin.weekness)
					return 'weekness';
				return 'todo';
			}
		},
		{
			name: 'dids',
			showField: function() {
				if(!$scope.fakin.weekness)
					return 'weekness';
				if(!$scope.fakin.todo)
					return 'todo';
				return 'did';
			},
			faker: function() {
				$scope.$on('diddone', function() {
					if( --$scope.fakin.count > 0 ) {
						$scope.fakin.type.fake();
					} else {
						$scope.contrib = _.pick($scope.did, ['artifactType']);
						$scope.processing = false;
					}
				});

				$scope.fakin.type.fake();
			},
			fake: function() {
				$scope.processing = true;
				$scope.did = {
					title: generator.title(),
					body: generator.body(),
					weekness: $scope.fakin.weekness.name,
					todo: $scope.fakin.todo.slug,
					artifactType: 'image',
					artifact: generator.artifact()
				};
				api.dids.create($scope.did);
			}
		}
	];

	api.weeknesses.get({}, function(results) {
		$scope.weeknesses = results;
	});
$scope.getTodos = function() {
	api.todos.get({weekness: $scope.fakin.weekness.slug}, function(results) {
		$scope.todos = results;
	});
}

	var generator = {};
	
	generator.title = function() {
		var possible = ['Title','Vitle','Spitle'];
		return random(possible);
	};

	generator.body = function() {
		var possible = ['rabble','tabble','babble'];
		return random(possible);
	};

	generator.weekness = function() {
		var possible = ['Beginner Piano'];
		return random(possible);
	};

	generator.artifact = function()	{
		var possible = [
			'{\"name\":\"016_3yEmUFm.gif\",\"size\":63908,\"type\":\"image/gif\",\"delete_type\":\"DELETE\",\"delete_url\":\"http://localhost:8888/files/016_3yEmUFm.gif\",\"url\":\"http://localhost:8888/files/016_3yEmUFm.gif\",\"thumbnail_url\":\"http://localhost:8888/files/thumbnail/016_3yEmUFm.gif\"}',
			'{\"name\":\"002_NW0mK39.gif\",\"size\":117037,\"type\":\"image/gif\",\"delete_type\":\"DELETE\",\"delete_url\":\"http://localhost:8888/files/002_NW0mK39.gif\",\"url\":\"http://localhost:8888/files/002_NW0mK39.gif\",\"thumbnail_url\":\"http://localhost:8888/files/thumbnail/002_NW0mK39.gif\"}',
			'{\"name\":\"009_XQiErrk (8).gif\",\"size\":94203,\"type\":\"image/gif\",\"delete_type\":\"DELETE\",\"delete_url\":\"http://localhost:8888/files/009_XQiErrk%20(8).gif\",\"url\":\"http://localhost:8888/files/009_XQiErrk%20(8).gif\",\"thumbnail_url\":\"http://localhost:8888/files/thumbnail/009_XQiErrk%20(8).gif\"}'
		];
		return random(possible);
	};


	$scope.fake = function() {
		$scope.processing = true;
		$scope.contrib.title = generator.title();
		$scope.contrib.body = generator.body();
		$scope.contrib.weekness = generator.weekness();
		$scope.contrib.artifact = generator.artifact();
		$scope.actions.submit();
	};

	$scope.$watch('flags.artifactUploaded', function() {
		//$scope.flags.artifactUploaded = true;
	});

	$scope.$on('contribdone', function() {
		if( --$scope.fakeCount > 0 ) {
			$scope.fake();
		} else {
			$scope.contrib = _.pick($scope.contrib, ['artifactType']);
			$scope.processing = false;
		}
	});
});
