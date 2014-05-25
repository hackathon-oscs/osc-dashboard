'use strict';

angular
  .module('od.services.constants', [
    'od.config',
    'ngResource'
  ])
  .service('Regioes', function($resource, GatewayHost) {
    return $resource(GatewayHost + '/regioes');
  })
  .service('Estados', function($resource, GatewayHost) {
    return $resource(GatewayHost + '/estados');
  });
