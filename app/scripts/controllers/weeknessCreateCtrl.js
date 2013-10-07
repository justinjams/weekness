'use strict';

angular.module('WeeknessApp')
.controller('WeeknessCreateCtrl', function ($scope, api, _) {
	$scope.percentage = 0;
	$scope.weekness = {
		title: '',
		description: '',
		category: '',
		generation: 0,
	};
	$scope.categories = api.categories.get();


	$scope.actions = {
		submit: function() {
			//results(content, completed);
			api.weeknesses.create($scope.weekness);
		}
	};

});
