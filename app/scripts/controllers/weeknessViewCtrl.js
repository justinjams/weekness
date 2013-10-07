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
        if($state.current.name === 'weekness' && !$stateParams.todo) {
          $stateParams.todo = $scope.currentTodo.slug;
          $state.transitionTo('weeknessTodos', $stateParams);
          ///$scope.$apply();
        }
      });
    });
    console.log($stateParams);
    if($stateParams.todo) {
      api.todos.get({slug: $stateParams.todo}, function(results) {
        if(!results.length) {
          $state.transitionTo('weekness', _.pick($stateParams, 'weekness'));
        }
        else {
          $scope.todo = _.clone(results[0]);
        }
        // $scope.currentTodo = _.clone(todo);
        // $scope.params.todo = $scope.params.todo || $scope.currentTodo.slug;
      });
    }

    if($stateParams.todos) {
      $scope.showTodos = true;
    }
    // api.todos.get({weekness: $scope.params.weekness, limit: 1, sort: "expires", order:"desc" }, function(results) {
    //   console.log(results);
    // });

    $scope.shortcuts = {
      todo: [
        {
          title: 'Nexts',
          url: '#/weekness/'+$scope.params.weekness+'/todos/nexts',
          state: 'weeknessNexts',
          params: {
            weekness: $scope.params.weekness,
          }
        },
        {
          title: 'Current',
          url: '#/weekness/'+$scope.params.weekness,
          state: 'weekness',
          params: {
            weekness: $scope.params.weekness,
          }
        },
        {
          title: 'Top',
          url: '#/weekness/'+$scope.params.weekness+'/top',
          state: 'weeknessTop',
          params: {
            weekness: $scope.params.weekness
          }
        },
        {
          title: 'History',
          url: '#/weekness/'+$scope.params.weekness+'/history',
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
      if($location.$$url.indexOf(url.replace('#', '')) !== -1) {
        return 'active';
      }
    }
  });