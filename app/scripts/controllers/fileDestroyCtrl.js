/*jshint -W106 */
'use strict';

angular.module('WeeknessApp')
.controller('FileDestroyCtrl', function ($scope, $http) {
	var file = $scope.file,
	state;
	if (file.url) {
		file.$state = function () {
			return state;
		};
		file.$destroy = function () {
			state = 'pending';
			return $http({
				url: file.delete_url,
				method: file.delete_type
			}).then(
			function () {
				state = 'resolved';
				$scope.clear(file);
			},
			function () {
				state = 'rejected';
			}
			);
		};
	} else if (!file.$cancel && !file._index) {
		file.$cancel = function () {
			$scope.clear(file);
		};
	}
});
