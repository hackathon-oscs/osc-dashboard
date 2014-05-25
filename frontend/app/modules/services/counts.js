'use strict';

angular
  .module('od.services.counts', [
    'od.config',
    'ngResource'
  ])
  .service('Convenios', function($resource, GatewayHost) {
    var endpoint = GatewayHost + '/convenios';
    var actions = {
      count: { method: 'GET', isArray: false, url: endpoint + '/count' }
    };
    return $resource(endpoint, {}, actions);
  })
  .service('Propostas', function($resource, GatewayHost) {
    var endpoint = GatewayHost + '/propostas';
    var actions = {
      count: { method: 'GET', url: endpoint + '/count' }
    };
    return $resource(endpoint, {}, actions);
  });
