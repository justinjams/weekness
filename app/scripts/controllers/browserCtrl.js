/*global $ */
'use strict';

angular.module('WeeknessApp')
  .controller('BrowserCtrl', function ($scope, api, navi, $stateParams) {
			$scope.$watch( function() { return navi.get(); }, function () {
				$scope.boxies = navi.get();
				console.log($stateParams);
			}, true);
  });