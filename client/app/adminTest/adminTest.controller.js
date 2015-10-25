'use strict';

angular.module('partyappApp')
  .controller('AdminTestCtrl', function ($scope, $http) {
    $scope.message = 'Hello';

    $http.get('')
  });
