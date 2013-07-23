'use strict';

angular.module('WeeknessApp')
  .controller('MainCtrl', function ($scope, db, _) {
    var maxContribs = 50;
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

    $scope.$on('isotope.onLayout', function() {
      var visible = $('.kindling:not(".isotope-hidden")').length;
      console.log(visible);
      if( visible >= maxContribs )
        return;
      var params = {
        weekness: $('#filter .selected').attr('ok-sel').replace('.',''),
        limit: maxContribs - visible
      };
      refillContribs(params);
    });

    var refillContribs = function(params) {
      console.log('refill');
      db.Contrib.query(params, {}, function(e){
        $.each(e, function() {
          //console.log(this);
          //console.log(this.artifact);
          if(this.artifact == "[object Object]")
            return;
          this.artifact = $.parseJSON(this.artifact);
        });
        $scope.contribs = _.union($scope.contribs, e);
      });
    }
    refillContribs({limit: 50});
  });