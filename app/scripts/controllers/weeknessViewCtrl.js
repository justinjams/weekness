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
    $scope.currentTodo = {};
    api.weeknesses.get({name: $scope.params.weekness}, function(results) {
      $scope.weekness = results[0];
      api.getCurrentTodo($scope.weekness, function(todo) {
        $scope.currentTodo = _.clone(todo);
        $scope.params.todo = $scope.params.todo || $scope.currentTodo.slug;
        console.log($scope.currentTodo);
      });
    });
    // api.todos.get({weekness: $scope.params.weekness, limit: 1, sort: "expires", order:"desc" }, function(results) {
    //   console.log(results);
    // });

    $scope.shortcuts = {
      todo: [
        {
          title: 'Nexts',
          url: '/weekness/'+$scope.params.weekness+'/nexts',
          state: 'weeknessNexts',
          params: {
            weekness: $scope.params.weekness
          }
        },
        {
          title: 'Current',
          url: '/weekness/'+$scope.params.weekness+'/'+$scope.currentTodo.slug,
          state: 'weekness',
          params: {
            weekness: $scope.params.weekness,
          }
        },
        {
          title: 'Top',
          url: '/weekness/'+$scope.params.weekness+'/top',
          state: 'weeknessTop',
          params: {
            weekness: $scope.params.weekness
          }
        },
        {
          title: 'History',
          url: '/weekness/'+$scope.params.weekness+'/history',
          state: 'weeknessHistory',
          params: {
            weekness: $scope.params.weekness
          }
        },
      ]
    };

    // _.defaults($scope.paramWatch, {
    //   limit: baseLimit
    // }) 
    $scope.showOrHideTodoForm = function() {
      return $scope.showTodoForm ? 'Hide' : 'Show';
    }
    
    $scope.transitionTo = function(item) {
      $state.transitionTo(item.state, item.params);
      // console.log($state);
      // console.log($location);
      // console.log(item);
    }
    $scope.isActive = function(url) {
      if($location.$$url.indexOf(url) !== -1) {
        return 'active';
      }
    }

    $scope.$on('isotope.onLayout', function() {
      var visible = $('.kindling:not(".isotope-hidden")').length;
      console.log(visible);
      if( visible >= baseLimit ){
        return;
      }
      refill();
    });

    var refill = function() {
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