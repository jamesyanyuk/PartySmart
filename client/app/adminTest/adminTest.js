'use strict';

angular.module('partyappApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('adminTest', {
        url: '/adminTest',
        templateUrl: 'app/adminTest/adminTest.html',
        controller: 'AdminTestCtrl',
        authenticate: false
      });
  });
