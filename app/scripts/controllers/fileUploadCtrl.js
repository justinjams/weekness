(function() {
  'use strict';
  angular.module('WeeknessApp').controller('FileUploadCtrl', function($scope, $http, $filter, $window, uploadUrl) {
    $scope.loadingFiles = true;
    $scope.options = {
      url: uploadUrl,
      maxNumberOfFiles: 1
    };
    return $http.get(uploadUrl).then(function() {
      // this funtion is passed a response, but
      // we ignore this since we aren't using it.
      $scope.loadingFiles = false;
      $scope.queue = [];
      return $scope.queue;
    }, function() {
      $scope.loadingFiles = false;
      return $scope.loadingFiles;
    });
  });

}).call(this);
