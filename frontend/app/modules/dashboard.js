'use strict';

angular.module('templates', []);

angular
  .module('od', [
    'od.controllers.home',
    'templates',
    'ui.router'
  ])
  .controller('OscDashboardCtrl', function() {
  })
  .config(function($urlRouterProvider) {
    $urlRouterProvider.otherwise('/');
  });
