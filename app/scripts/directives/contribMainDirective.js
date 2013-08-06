/*jshint unused: false */
'use strict';

angular.module('WeeknessApp')
  .directive('contribMain', function () {
    return {
      compile: function compile(iElement, iAttrs) {
        return function postLink(scope, iElement, iAttrs) {
          if(scope.contrib) {
            iElement.text(scope.contrib.title);
          }
        };
      },
      template: '<div></div>',
      restrict: 'A',
      link: function postLink(scope, iElement, iAttrs) {
        console.log('link: function postLink in directives/contribMain.js');
      }
    };
  });
/*jshint unused: true */