'use strict';

angular.module('WeeknessApp')
  .controller('ContribCtrl', function ($scope, contribs, _) {
    $scope.percentage = 0;
    $scope.contrib = {
    	title: '',
    	body: '',
    	weakness: '',
    	artifactType: '',
    	artifact: ''
    };
  	$scope.artifactTypes = ['image', 'other'];
    $scope.artifactUploaded = false;
 
    // watch for file upload from jquery.fileupload-angular.js
    // and update value, which will be be validated by contrib-artifact
    // directive
    $scope.$on('fileuploaddone', function(e, response) {
      $scope.artifactUploaded = true;
      var file = response.result.files[0], keys = _.keys(file), i, blacklist = [];
      for(i = 0; i < keys.length; i++) {
        if(keys[i].charAt(0) == '$')
          blacklist.push(keys[i])
      }
      file = _.omit(file, blacklist);
      $scope.contrib.artifact = file;
    });

    // when the select box is changed, we should reset our
    // artifact validation status
    $scope.$watch('contrib.artifactType', function() {
      $scope.files = [];
      $scope.artifactUploaded = false;
    });

    $scope.submit = function() {
    	console.log('in');

      //results(content, completed);
      contribs.create($scope.contrib);
    }
  });
