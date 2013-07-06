'use strict';

describe('Service: mongoService', function () {

  // load the service's module
  beforeEach(module('WeeknessApp'));

  // instantiate service
  var mongoService;
  beforeEach(inject(function (_mongoService_) {
    mongoService = _mongoService_;
  }));

  it('should do something', function () {
    expect(!!mongoService).toBe(true);
  });

});
