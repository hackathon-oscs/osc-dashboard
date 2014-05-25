var _ = require('underscore');
var sap = require('sqlite3-as-promised');
var sqlite3 = require('sqlite3');
var db = new sqlite3.Database('xunga.db');

var promisedRoute = require('../promised_route');
module.exports = function(app) {
  app.get('/convenios', promisedRoute(function(req, res) {
    console.log(sap);
    return sap.all(db, 'select count(1) from convenios');
  }));
};
