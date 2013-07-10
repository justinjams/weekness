'use strict';

angular.module('WeeknessApp')
  .controller('ContribCtrl', function ($scope, contribs) {
    $scope.contrib = {
    	title: '',
    	body: '',
    	weakness: '',
    	artifactType: '',
    	artifact: ''
    };
  	$scope.artifactTypes = ['image', 'other'];

  	$scope.validate = {
  		image : function() {
      	var fname = true;//document.getElementById('image-file').value;
  	    // check if fname has the desired extension
  	    if (fname) {
  						return true;
  	    } else {
  						return false;
  	    }
  		}
  	}

    $scope.submit = function() {
    	console.log('in');
    	if($scope.validate.image())
        contribs.create($scope.contrib);
    }
  });
