var promisedRoute = require('../promised_route');

module.exports = function(app) {
  app.get('/', promisedRoute(function(req, res) {
    return null;
  }));
};
