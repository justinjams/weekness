'use strict';

angular.module('WeeknessApp')
  .controller('RegisterCtrl', function ($scope, users, $location, $state) {
    // init data
  	$scope.authError = 'no-error';
  	$scope.user = users.user.get();
    $scope.user.role = 'user';

    // init ui
    //$('.btn-group').button()

    $scope.availability = function(e) {
      users.authenticate(e.target.form[0].value);
    };

    $scope.submit = function() {
      users.create($scope.user);
    }

    $scope.getNumber = function(num) {
      return new Array(num);
    }

    $scope.$on('authentication', function(e, response) {
        $scope.authError = response;
        console.log(response);
    });

    $scope.$on('event:auth-loginConfirmed', function() {
      $scope.user = users.user.get();
      $state.transitionTo('main');
    });
  });
