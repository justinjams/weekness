'use strict';

describe('Service: uploadManager', function () {

  // load the service's module
  beforeEach(module('WeeknessApp'));

  // instantiate service
  var uploadManager;
  beforeEach(inject(function (_uploadManager_) {
    uploadManager = _uploadManager_;
  }));

  it('should do something', function () {
    expect(!!uploadManager).toBe(true);
  });

});
