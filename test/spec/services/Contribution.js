'use strict';

describe('Service: Contribution', function () {

  // load the service's module
  beforeEach(module('WeeknessApp'));

  // instantiate service
  var Contribution;
  beforeEach(inject(function (_Contribution_) {
    Contribution = _Contribution_;
  }));

  it('should do something', function () {
    expect(!!Contribution).toBe(true);
  });

});
