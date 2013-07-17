'use strict';

angular.module('WeeknessApp')
  .controller('FakerCtrl', function ($scope, $rootScope, _) {

  	$scope.fakeCount = 0;

    var random = function(possible) {
    	return possible[Math.floor(Math.random()*possible.length)];
    }
    var generator = {};
    generator.title = function() {
    	var possible = ["Title","Vitle","Spitle"];
    	return random(possible);
    };

    generator.body = function() {
    	var possible = ["rabble","tabble","babble"];
    	return random(possible);
    };

    generator.weekness = function() {
    	var possible = ["health","tech","home","boats","boots","booties"];
    	return random(possible);
    };

    generator.artifact = function()	{
    	var possible = [
    		"{\"name\":\"016_3yEmUFm.gif\",\"size\":63908,\"type\":\"image/gif\",\"delete_type\":\"DELETE\",\"delete_url\":\"http://localhost:8888/files/016_3yEmUFm.gif\",\"url\":\"http://localhost:8888/files/016_3yEmUFm.gif\",\"thumbnail_url\":\"http://localhost:8888/files/thumbnail/016_3yEmUFm.gif\"}",
    		"{\"name\":\"002_NW0mK39.gif\",\"size\":117037,\"type\":\"image/gif\",\"delete_type\":\"DELETE\",\"delete_url\":\"http://localhost:8888/files/002_NW0mK39.gif\",\"url\":\"http://localhost:8888/files/002_NW0mK39.gif\",\"thumbnail_url\":\"http://localhost:8888/files/thumbnail/002_NW0mK39.gif\"}",
    		"{\"name\":\"009_XQiErrk (8).gif\",\"size\":94203,\"type\":\"image/gif\",\"delete_type\":\"DELETE\",\"delete_url\":\"http://localhost:8888/files/009_XQiErrk%20(8).gif\",\"url\":\"http://localhost:8888/files/009_XQiErrk%20(8).gif\",\"thumbnail_url\":\"http://localhost:8888/files/thumbnail/009_XQiErrk%20(8).gif\"}"
    		];
    	return random(possible);
    }

    $scope.contrib.artifactType = 'image';

    $scope.$watch('flags.artifactUploaded', function() {
       $scope.flags.artifactUploaded = true;
   	});

    $scope.fake = function() {
    	$scope.processing = true;
    	$scope.contrib.title = generator['title']();
    	$scope.contrib.body = generator.body();
    	$scope.contrib.weekness = generator.weekness();
    	$scope.contrib.artifact = generator.artifact();
        //console.log($scope.contrib);
		//$('input[type="submit"]').click();
		$scope.actions.submit();
    }
		//console.log($rootScope.$$watchers[1].get('submit'));//.submit();
		//console.log($rootScope.$$watchers[1].get());

    $scope.$on('contribdone', function() {
    	if( --$scope.fakeCount > 0 ) {
    		$scope.fake();
    	} else {
    		$scope.contrib = _.pick($scope.contrib, ['artifactType']);
    		$scope.processing = false;
    	}
    });
  });
