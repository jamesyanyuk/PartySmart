'use strict';

angular.module('partyappApp')
  .controller('SubmitCtrl', function ($scope, $http) {
    $scope.submit = function() {
      if (!$scope.complainant || !$scope.address) {
        console.log('Not enough input');
      } else {
        $http.post('/api/complaint', {
          complainant: $scope.complainant,
          address: $scope.address,
          details: $scope.details,
          latitude: 50,
          longitude: 50
        }).success(function (complaint) {
          console.log('Successfully submitted complaint');
        }).error(function (err) {
          console.log('ERROR: ' + err);
        });
      }
    }
  });
