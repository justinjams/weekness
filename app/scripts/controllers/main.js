'use strict';

angular.module('WeeknessApp')
  .controller('MainCtrl', function ($scope, User) {
	var justin = new User({name: 'Justin'});
	justin.$save(function(){
		console.log('saved!');
	});

    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  User.all(function(users){
     $scope.awesomeThings.push(users);
  });
  });
