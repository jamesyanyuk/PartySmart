'use strict';

angular.module('partyappApp')
  .controller('AdminTestCtrl', function ($scope, $http) {
    $scope.message = 'Hello';

    $scope.parties = [];
    $scope.complaints = [];

    $scope.tab = 'parties';

    $scope.partiesTabClick = function() {
      $scope.tab = 'parties';
    };

    $scope.complaintsTabClick = function() {
      $scope.tab = 'complaints';
      console.log('hey');
    };

    $http.get('/api/party').success(function(parties) {
      $scope.parties = parties;
    });

    $http.get('/api/complaint').success(function(complaints) {
      $scope.complaints = complaints;
    });

    setInterval(function() {
      $http.get('/api/party').success(function(parties) {
        $scope.parties = parties;
      });

      $http.get('/api/complaint').success(function(complaints) {
        $scope.complaints = complaints;
      });
    }, 3500);
  });
