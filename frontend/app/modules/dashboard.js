'use strict';

angular.module('templates', []);

angular
  .module('od', [
    'templates',
    'ui.router'
  ])
  .controller('OscDashboardCtrl', function() {
  })
  .config(function($urlRouterProvider) {
    $urlRouterProvider.otherwise('/');
  });
