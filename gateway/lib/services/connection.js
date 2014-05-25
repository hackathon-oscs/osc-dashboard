var Q = require('q');
var _ = require('underscore');
var qs = require('querystring');
var zlib = require('zlib');
var http = require('http');

function Connection(basePath) {
  var self = this;

  self.get = function(path, parms, encoding) {
    var deferred = Q.defer();
    var query = (parms)? '?'+qs.stringify(parms) : '';
    var fullUrl = basePath + path + ".json" + query;
    var buffer = [];

    function handleResponse(err, body) {
      if (err) {
        deferred.reject({ err: err });
      }
      else {
        deferred.resolve(JSON.parse(body));
      }
    }

    console.log('about to hit', fullUrl);
    http.get(fullUrl, function(res) {
      var stream = res;
      var gunzip = zlib.createGunzip();
      var contentEncoding = res.headers['content-encoding'];

      if ((contentEncoding) && (contentEncoding.indexOf('gzip') > -1)) {
        res.pipe(gunzip);
        stream = gunzip;
      }

      stream.on('data', function(data) {
        buffer.push(data.toString());
      }).on('end', function() {
        handleResponse(null, buffer.join(''));
      }).on('error', handleResponse);
    }).on('error', handleResponse);

    return deferred.promise;
  };

  self.allPages = function(path, collectionKey, makeHeaderWith, transformEntryWith) {
    var deferred = Q.defer();
    var result = [];

    function nextPage(offset) {
      return self.get(path, { offset: offset }, 'utf-8').then(function(page) {
        var transformed = _(page[collectionKey]).map(transformEntryWith);
        result = result.concat(transformed);

        if (!!page.metadados.proximos) {
          nextPage(offset + 500);
        }
        else {
          var header = makeHeaderWith(page[collectionKey][0]);
          deferred.resolve([header, result]);
        }
      }).fail(function(err) {
        deferred.reject(err);
      });
    }

    nextPage(0);

    return deferred.promise;
  };
}

module.exports = {
  build: function(basePath) { return new Connection(basePath); }
};
