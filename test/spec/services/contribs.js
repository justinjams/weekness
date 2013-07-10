'use strict';

describe('Service: contribs', function () {

  // load the service's module
  beforeEach(module('WeeknessApp'));

  // instantiate service
  var contribs;
  beforeEach(inject(function (_contribs_) {
    contribs = _contribs_;
  }));

  it('should do something', function () {
    expect(!!contribs).toBe(true);
  });

});
