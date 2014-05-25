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
      angular.forEach($scope.estados, function(val) {
        if(val.regiao === $scope.regiao) {
          this.push(val);
        }
      }, $scope.estadosFiltrados);
    });

    $scope.graph = {};
    $scope.graph.size = 400;
    $scope.graph.data = [30, 20, 10, 40];


    $scope.plotData = function () {
      var canvas;
      var context;
      var lastend = 0;
      var totalData = _.reduce($scope.graph.data, function(total, current){ return total + current; }, 0)
      var myColor = ["#ECD078","#D95B43","#C02942","#542437","#53777A"];

      canvas = document.getElementById("canvas");
      context = canvas.getContext("2d");
      context.clearRect(0, 0, canvas.width, canvas.height);

      for (var i in $scope.graph.data) {
        context.fillStyle = myColor[i];
        context.beginPath();
        context.moveTo(200,150);
        context.arc(200,150,150,lastend,lastend+
          (Math.PI*2*($scope.graph.data[i]/totalData)),false);
        context.lineTo(200,150);
        context.fill();
        lastend += Math.PI*2*($scope.graph.data[i]/totalData);
      }
    };

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
