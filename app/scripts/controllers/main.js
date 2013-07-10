'use strict';

angular.module('WeeknessApp')
  .controller('MainCtrl', function ($scope, _db) {

  _db.User.query({}, function(matches) {
    //$scope.contribs = matches;
    console.log(matches);
    console.log('Found matches!');
   });

  });