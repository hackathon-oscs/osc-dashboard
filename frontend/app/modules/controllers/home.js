'use strict';

angular
  .module('od.controllers.home', [
    'od',
    'ui.router'
  ])
  .controller('HomeCtrl', function() {
  })
  .config(function($stateProvider) {
    $stateProvider
      .state('home', {
        url: '^/',
        views: {
          nav: { controller: 'HomeCtrl', templateUrl: 'modules/views/nav.html' },
          main: { controller: 'HomeCtrl', templateUrl: 'modules/views/home.html' }
        }
      });
  });
