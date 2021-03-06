'use strict';

angular.module('WeeknessApp')
.controller('TodoCreateCtrl', function ($rootScope, $scope, api, _) {
	$scope.percentage = 0;
	$scope.todo = {
		title: '',
		body: '',
		weekness: api.getWeekness(),
		artifactType: '',
		artifact: '',
		slug: '',
		generation: '',
		votes: 0,
		duration: 604800000
	};
	api.weeknesses.get({name: api.getWeekness()}, function(matches) {
		var weekness = matches[0];
		//_.extend($scope.todo, _pick(weekness, ['generation']);
		$scope.todo.generation = parseInt(weekness.generation, 10)+1;
	});
	$scope.artifactTypes = ['image', 'none'];
	$scope.flags = {
		artifactUploaded: false
	};
	$scope.submit = function() {
			//results(content, completed);
			$scope.todo.slug = api.slugify($scope.todo.title, 'todo:title');
			api.todos.create($scope.todo);
	};


	// watch for file upload from jquery.fileupload-angular.js
	// and update value, which will be be validated by todo-artifact
	// directive
	$scope.$on('fileuploaddone', function(e, response) {
		$scope.flags.artifactUploaded = true;
		var file = response.result.files[0], keys = _.keys(file), i, blacklist = [];
		for(i = 0; i < keys.length; i++) {
			if(keys[i].charAt(0) === '$') {
				blacklist.push(keys[i]);
			}
		}
		file = _.omit(file, blacklist);
		$scope.todo.artifact = file;
	});

	// when the select box is changed, we should reset our
	// artifact validation status
	$scope.$watch('todo.artifactType', function() {
		$scope.files = [];
		$scope.flags.artifactUploaded = false;
	});
});
