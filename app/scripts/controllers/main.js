'use strict';

angular.module('WeeknessApp')
  .controller('MainCtrl', function ($scope, db) {
    $scope.user = {
      name: 'John'
    };

    $scope.buuser = {
      name: 'Stuff'
    };

  db.User.save($scope.user, {}, function(e){
    console.log(e);
  });

  });