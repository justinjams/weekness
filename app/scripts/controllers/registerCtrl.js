'use strict';

angular.module('WeeknessApp')
.controller('RegisterCtrl', function ($scope, $location, $state, api) {
    // init data
    $scope.status = '';
    $scope.user = api.user.current;

    $scope.$on('available', function () {
      $scope.status = 'available';
    });

    $scope.avail = function(e) {
      api.user.avail({ email: e.target.form[0].value });
    };

    $scope.submit = function() {
      api.user.register($scope.user);
    };

    $scope.getNumber = function(num) {
      return new Array(num);
    };

    $scope.$on('authentication', function(e, response) {
      $scope.status = response;
      console.log(response);
    });

    $scope.$on('authenticated', function() {
      $state.transitionTo('index');
    });
  });
