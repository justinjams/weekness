'use strict';

angular.module('WeeknessApp')
  .directive('pageView', function () {
    return {
       template: '<div ng-include="getTemplate()"></div>',
      restrict: 'A',
      scope: {
        settings: '=settings'
      },
      link: function(scope, element, attrs) {
          scope.getTemplate = function(){
              return scope.settings.view;
          }

        //element.text('this is the weeknessView directive');
      }
    };
  });
