'use strict';

angular
  .module('od.controllers.home', [
    'od',
    'od.services.constants',
    'ui.router'
  ])
  .controller('HomeCtrl', function($scope, Estados, Regioes) {
    $scope.regioes = Regioes.query();
    $scope.estados = Estados.query();
  })
  .config(function($stateProvider) {
    $stateProvider
      .state('home', {
        url: '^/',
        views: {
          header: { controller: 'HomeCtrl', templateUrl: 'modules/views/header.html' },
          nav: { controller: 'HomeCtrl', templateUrl: 'modules/views/nav.html' },
          main: { controller: 'HomeCtrl', templateUrl: 'modules/views/home.html' },
          footer: { controller: 'HomeCtrl', templateUrl: 'modules/views/footer.html' },

          'alerts@home': { templateUrl: 'modules/views/alerts.html' },
          'pieChart@home': { templateUrl: 'modules/views/piechart.html' },
          'histogram@home': { templateUrl: 'modules/views/histogram.html' },
          'tableData@home': { templateUrl: 'modules/views/tabledata.html' }
        }
      });
  });
