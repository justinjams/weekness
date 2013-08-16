/*global $ */
'use strict';

angular.module('WeeknessApp')
.controller('SideBarCtrl', function ($scope, api, navi, $location, $state, _) {

		$scope.$watch( function() { return navi.sideBarItems }, function () {
			$scope.sideBarItems = navi.sideBarItems;
		}, true);

	$scope.select = function(selectedItem) {
		$.each($scope.sideBarItems, function() {
			this.active = null; 
		});
		if(selectedItem.active === 'active') {
			selectedItem.active = false;
		}
		else {
			selectedItem.active = 'active';
		}
	};

	$scope.transitionTo = function(item) {
		console.log(item);

		$state.transitionTo(item.state, item.params);
		// console.log($state);
		// console.log($location);
		// console.log(item);
	}
	$scope.isActive = function(url) {
		if($location.$$url.indexOf(url.replace('#', '')) !== -1) {
			return 'active';
		}
	}
});
