'use strict';

angular.module('WeeknessApp')
  .controller('RegisterCtrl', function ($scope, users, $location, $state) {
    // init data
  	$scope.status = '';
  	$scope.user = users.user.get();

    $scope.$on('available', function () {
      $scope.status = 'available';
    });

    $scope.avail = function(e) {
      users.avail({ email: e.target.form[0].value });
    };

    $scope.submit = function() {
      users.register($scope.user);
    }

    $scope.getNumber = function(num) {
      return new Array(num);
    }

    $scope.$on('authentication', function(e, response) {
        $scope.status = response;
        console.log(response);
    });

    $scope.$on('authenticated', function() {
      $state.transitionTo('main');
    });
  });
