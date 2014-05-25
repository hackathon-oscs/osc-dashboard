var Q = require('q');
var _ = require('underscore');
var sap = require('sqlite3-as-promised');
var sqlite3 = require('sqlite3');
var db = new sqlite3.Database('xunga.db');

var promisedRoute = require('../promised_route');

function justCount(results) {
  return { result: results[0]['count(1)'] };
}
module.exports = function(app) {
  app.get('/municipios/:uf', promisedRoute(function(req, res) {
    var deferred = Q.defer();

    var stmt = db.prepare('select * from municipios where uf = ?');

    stmt.all([req.params.uf.toUpperCase()], function(err, result) {
      deferred.resolve(result);
    });

    stmt.finalize();

    return deferred.promise;
  }));
  app.get('/naturezas_juridicas', promisedRoute(function(req, res) {
    return sap.all(db, 'select * from naturezas_juridicas where id > 0');
  }));
  app.get('/propostas/count', promisedRoute(function(req, res) {
    return sap.all(db, 'select count(1) from propostas').then(justCount);
  }));
  app.get('/convenios/count', promisedRoute(function(req, res) {
    return sap.all(db, 'select count(1) from convenios').then(justCount);
  }));
};
