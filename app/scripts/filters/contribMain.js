'use strict';

angular.module('WeeknessApp')
  .filter('contribMain', function () {
    return function (input) {
      return 'contribMain filter: ' + input;
    };
  });
