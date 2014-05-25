'use strict';

angular
  .module('od.controllers.home', [
    'od',
    'od.services.constants',
    'ui.router'
  ])
  .controller('HomeCtrl', function($scope, Estados, Regioes, NaturezasJuridicas) {
    $scope.regioes = Regioes.query();
    $scope.estados = Estados.query();
    $scope.naturezas = NaturezasJuridicas.query();

    $scope.$watch('regiao', function() {
      $scope.estadosFiltrados = [];
      angular.forEach($scope.estados, function(val, key) {
        if(val.regiao == $scope.regiao) {
          this.push(val);
        }
      }, $scope.estadosFiltrados);
    });

    $scope.graph = {}
    $scope.graph.size = 400;
    $scope.graph.dimension = ($scope.graph.size / 2);

    $scope.graph.plots = [
        {
          coordenates: 'M'+ $scope.graph.dimension + ',' + $scope.graph.dimension + ' L200,20 A180,180 0 0,1 377,231 z',
          color: '#ff0000'
        },
        {
          coordenates: 'M'+ $scope.graph.dimension + ',' + $scope.graph.dimension + ' L377,231 A180,180 0 0,1 138,369 z',
          color: '#00ff00'
        },
        {
          coordenates: 'M'+ $scope.graph.dimension + ',' + $scope.graph.dimension + ' L138,369 A180,180 0 0,1 20,194 z',
          color: '#0000ff'
        },
        {
          coordenates: 'M'+ $scope.graph.dimension + ',' + $scope.graph.dimension + ' L20,194 A180,180 0 0,1 75,71 z',
          color: '#ff00ff'
        },
        {
          coordenates: 'M'+ $scope.graph.dimension + ',' + $scope.graph.dimension + ' L75,71 A180,180 0 0,1 200,20 z',
          color: '#ffff00'
        }
      ]
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
