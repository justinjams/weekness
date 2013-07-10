'use strict';

describe('Controller: FileDestroyControllerCtrl', function () {

  // load the controller's module
  beforeEach(module('WeeknessApp'));

  var FileDestroyControllerCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    FileDestroyControllerCtrl = $controller('FileDestroyControllerCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
