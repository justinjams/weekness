'use strict';

angular.module('WeeknessApp')
.controller('DidCreateCtrl', function ($scope, api, _) {
	$scope.percentage = 0;
	$scope.did = {
		title: '',
		body: '',
		weekness: '',
		artifactType: '',
		artifact: ''
	};
	$scope.artifactTypes = ['image', 'other'];
	$scope.flags = {
		artifactUploaded: false
	};
	$scope.actions = {
		submit: function() {
			//results(content, completed);
			api.dids.create($scope.did);
		}
	};

	// watch for file upload from jquery.fileupload-angular.js
	// and update value, which will be be validated by did-artifact
	// directive
	$scope.$on('fileuploaddone', function(e, response) {
		$scope.flags.artifactUploaded = true;
		var file = response.result.files[0], keys = _.keys(file), i, blacklist = [];
		for(i = 0; i < keys.length; i++) {
			if(keys[i].charAt(0) === '$') {
				blacklist.push(keys[i]);
			}
		}
		file = _.omit(file, blacklist);
		$scope.did.artifact = file;
	});

	// when the select box is changed, we should reset our
	// artifact validation status
	$scope.$watch('did.artifactType', function() {
		$scope.files = [];
		$scope.flags.artifactUploaded = false;
	});
});
