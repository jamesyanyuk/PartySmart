'use strict';

describe('Controller: AdminTestCtrl', function () {

  // load the controller's module
  beforeEach(module('partyappApp'));

  var AdminTestCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    AdminTestCtrl = $controller('AdminTestCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
