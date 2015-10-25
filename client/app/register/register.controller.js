'use strict';

angular.module('partyappApp')
  .controller('RegisterCtrl', function ($scope, $http, $modal) {
    $scope.submit = function() {
      if(!$scope.contactEmail ||
        !$scope.date ||
        !$scope.time ||
        !$scope.address ||
        !$scope.contactMobilePhone) {
        console.log('Not enough input');
        //dialogs.notify('Something Happened','Something happened at this point in the application that I wish to let you know about');
      } else {
        var formattedDate = $scope.date + ' ' + $scope.time.split(' ')[0] + ':00 ' + $scope.time.split(' ')[1] + ' UTC';

        $http.post('/api/party', {
          latitude: 50,
          longitude: 50,
          date: formattedDate,
          address: $scope.address,
          contactMobilePhone: $scope.contactMobilePhone,
          contactEmail: $scope.contactEmail
        }).success(function(awesomeThings) {
          console.log('Successfully registered party');
        }).error(function(err) {
          console.log('ERROR: ' + err);
        });
      }
    }

    $scope.cancel = function() {

    }
  });
