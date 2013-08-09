'use strict';

angular.module('WeeknessApp')
.controller('WeeknessCreateCtrl', function ($scope, api, _) {
	$scope.percentage = 0;
	$scope.weekness = {
		title: '',
		description: '',
		category: ''
	};
	$scope.categories = api.categories.get();

	$scope.actions = {
		submit: function() {
			//results(content, completed);
			api.weeknesses.create($scope.weekness);
		}
	};

});
