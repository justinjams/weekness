(function() {
  "use strict";
  angular.module("WeeknessApp").controller('FileUploadCtrl', function($scope, $http, $filter, $window, uploadUrl) {
    $scope.loadingFiles = true;
    $scope.options = {
      url: uploadUrl,
      maxNumberOfFiles: 1
    };
    return $http.get(uploadUrl).then((function(response) {
      $scope.loadingFiles = false;
      return $scope.queue = [];
    }), function() {
      return $scope.loadingFiles = false;
    });
  });

  /*        
  
  .controller('DemoFileUploadController', [
              '$scope', '$http', '$filter', '$window',
              function ($scope, $http, $filter, $window) {
                  if (!isOnGitHub) {
                      $scope.loadingFiles = true;
                      $scope.options = {
                          url: url
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
                  }
              }
          ])
  */


}).call(this);
