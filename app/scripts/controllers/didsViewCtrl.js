'use strict';

angular.module('WeeknessApp')
.controller('DidsViewCtrl', function ($scope, api, _) {
		var lastRefill = 0, baseLimit = 10;

  $scope.$on('isotope.onLayout', function() {
    var visible = $('.kindling:not(".isotope-hidden")').length;
    if( visible >= baseLimit ){
      return;
    }
    _.defer(refill);
  });

  $scope.infiniteScroll = function() {
  	console.log('ping!');
  };

  var refill = function() {
  	//console.log($scope.params);
    if($.isEmptyObject($scope.params)) 
      return;
    api.dids.get($scope.params, function(results){
    	 console.log(results);
      lastRefill = results.length;
      $.each(results, function() {
        if(this.artifact === '[object Object]') {
          console.err('artifact object was not deserialized');
          return;
        }
        this.artifact = $.parseJSON(this.artifact);
      });
      $scope.dids = _.union($scope.dids, results);
    });
  };
  _.defer(refill);
});
