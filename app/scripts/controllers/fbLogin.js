'use strict';

angular.module('WeeknessApp')
  .controller('FbLoginCtrl', function ($scope, $state, users) {
    window.loaded = function() {
    	var newLoc = document.getElementById('fb').contentWindow.location.href;
    	if(newLoc) {
    		if(newLoc.indexOf('success') !== -1) {
    			//console.log('Winner!');
    			users.update();
    			$state.transitionTo('main');
    		}
    	}
    }
  });
