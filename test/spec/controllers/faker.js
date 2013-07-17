'use strict';

describe('Controller: FakerCtrl', function () {

  // load the controller's module
  beforeEach(module('WeeknessApp'));

  var FakerCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    FakerCtrl = $controller('FakerCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
