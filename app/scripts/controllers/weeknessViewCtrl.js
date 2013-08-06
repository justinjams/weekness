/*global $ */
'use strict';

angular.module('WeeknessApp')
  .controller('WeeknessViewCtrl', function ($scope, $state, $location, $stateParams, api, _) {
    var baseLimit = 50,
      lastRefill = 0;
    $scope.dids = [];
    $scope.paramWatch = $stateParams;
    $scope.params = _.defaults(_.clone($scope.paramWatch), {
      limit: baseLimit
    });
    api.weeknesses.get({name: $scope.params.weekness}, function(results) {
      $scope.weekness = results[0];
    });
    api.todos.get({weekness: $scope.params.weekness, limit: 1, sort: "expires", order:"desc" }, function(results) {
      console.log(results);
    })
    // _.defaults($scope.paramWatch, {
    //   limit: baseLimit
    // })

    $scope.$on('isotope.onLayout', function() {
      var visible = $('.kindling:not(".isotope-hidden")').length;
      console.log(visible);
      if( visible >= baseLimit ){
        return;
      }
      refill();
    });

    var refill = function() {
      //console.log('refill');

      if($.isEmptyObject($scope.params)) 
        return;
      api.dids.get($scope.params, function(results){
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
    refill();
  });