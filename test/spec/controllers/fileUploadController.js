'use strict';

describe('Controller: FileUploadControllerCtrl', function () {

  // load the controller's module
  beforeEach(module('WeeknessApp'));

  var FileUploadControllerCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    FileUploadControllerCtrl = $controller('FileUploadControllerCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
