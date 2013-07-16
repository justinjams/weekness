'use strict';

describe('Directive: contribArtifact', function () {
  beforeEach(module('WeeknessApp'));

  var element;

  it('should make hidden element visible', inject(function ($rootScope, $compile) {
    element = angular.element('<contrib-artifact></contrib-artifact>');
    element = $compile(element)($rootScope);
    expect(element.text()).toBe('this is the contribArtifact directive');
  }));
});
