'use strict';

angular.module('WeeknessApp')
  .controller('MainCtrl', function ($scope, db) {
    /*
    $scope.user = {
      name: 'John'
    };

    $scope.buuser = {
      name: 'Stuff'
    };
*/
    $scope.contribs = [];

    var addToList = function(contrib) {
      var s=angular.element('#isotopeContainer').scope(); 
      s.count = s.count || 0;
      //newItem={name:'add', number:s.count--, date: Date.now(), class:'purple'};
      s.$apply(s.contribs.push(contrib)); 
    }

    db.Contrib.query({limit: 50}, {}, function(e){
      $.each(e, function() {
        console.log(this);
        this.artifact = $.parseJSON(this.artifact);
      });
      $scope.contribs = e;
    });
  });