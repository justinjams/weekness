'use strict';

describe('Directive: uploadManager', function () {
  beforeEach(module('WeeknessApp'));

  var element;

  it('should make hidden element visible', inject(function ($rootScope, $compile) {
    element = angular.element('<upload-manager></upload-manager>');
    element = $compile(element)($rootScope);
    expect(element.text()).toBe('this is the uploadManager directive');
  }));
});
