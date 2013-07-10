'use strict';

angular.module('WeeknessApp')
  .controller('FileUploadControllerCtrl',  function ($scope, $http, $filter, $window) {
	$scope.loadingFiles = true;
	$scope.options = {
	    url: url
	};
	$scope.display = function ($event, file) {
	    var images = $filter('filter')($scope.queue, function (file) {
	        if (file.thumbnail_url) {
	            return true;
	        }
	    });
	    if ($window.blueimp.Gallery(images, {
	            index: file,
	            urlProperty: 'url',
	            titleProperty: 'name',
	            thumbnailProperty: 'thumbnail_url'
	        })) {
	        // Prevent the default link action on
	        // successful Gallery initialization:
	        $event.preventDefault();
	    }
	};
	$http.get(url)
	    .then(
	        function (response) {
	            $scope.loadingFiles = false;
	            $scope.queue = response.data.files || [];
	        },
	        function () {
	            $scope.loadingFiles = false;
	        }
	    );
  });
