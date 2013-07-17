'use strict';

describe('Directive: angularIsotopeDirective', function () {
  beforeEach(module('WeeknessApp'));

  var element;

  it('should make hidden element visible', inject(function ($rootScope, $compile) {
    element = angular.element('<angular-isotope-directive></angular-isotope-directive>');
    element = $compile(element)($rootScope);
    expect(element.text()).toBe('this is the angularIsotopeDirective directive');
  }));
});
