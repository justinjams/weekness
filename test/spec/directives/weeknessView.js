'use strict';

describe('Directive: weeknessView', function () {
  beforeEach(module('WeeknessApp'));

  var element;

  it('should make hidden element visible', inject(function ($rootScope, $compile) {
    element = angular.element('<weekness-view></weekness-view>');
    element = $compile(element)($rootScope);
    expect(element.text()).toBe('this is the weeknessView directive');
  }));
});
