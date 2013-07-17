'use strict';

describe('Directive: optKindDirective', function () {
  beforeEach(module('WeeknessApp'));

  var element;

  it('should make hidden element visible', inject(function ($rootScope, $compile) {
    element = angular.element('<opt-kind-directive></opt-kind-directive>');
    element = $compile(element)($rootScope);
    expect(element.text()).toBe('this is the optKindDirective directive');
  }));
});
