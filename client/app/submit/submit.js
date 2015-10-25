'use strict';

angular.module('partyappApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('submit', {
        url: '/submit',
        templateUrl: 'app/submit/submit.html',
        controller: 'SubmitCtrl',
        authenticate: false
      });
  });
