'use strict';

describe('Directive: isoSortByDataDirective', function () {
  beforeEach(module('WeeknessApp'));

  var element;

  it('should make hidden element visible', inject(function ($rootScope, $compile) {
    element = angular.element('<iso-sort-by-data-directive></iso-sort-by-data-directive>');
    element = $compile(element)($rootScope);
    expect(element.text()).toBe('this is the isoSortByDataDirective directive');
  }));
});
