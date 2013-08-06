'use strict';

angular.module('WeeknessApp')
  .directive('weeknessView', function () {
    return {
      templateUrl: 'views/weekness.html',
      restrict: 'A',
      scope: {
        settings: '=settings'
      },
      link: function(scope, element, attrs) {
      	// console.log(scope);
      	// console.log(element);
      	// console.log(attrs);

        //element.text('this is the weeknessView directive');
      }
    };
  });
