'use strict';

describe('Filter: contribMain', function () {

  // load the filter's module
  beforeEach(module('WeeknessApp'));

  // initialize a new instance of the filter before each test
  var contribMain;
  beforeEach(inject(function ($filter) {
    contribMain = $filter('contribMain');
  }));

  it('should return the input prefixed with "contribMain filter:"', function () {
    var text = 'angularjs';
    expect(contribMain(text)).toBe('contribMain filter: ' + text);
  });

});
