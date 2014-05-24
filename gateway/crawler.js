var _ = require('underscore');

var config     = require('./lib/config');
var connection = require('./lib/services/connection').build(config.api_path);

var endpoint = process.argv[2];

function identity(v) {
  return v;
}

function sqlInsertFor(table) {
  function quote(value) {
    if (value === null) {
      return 'null';
    }
    else if (/\d\d\d\d-\d\d-\d\d/.test(value)) {
      return '"'+value+'"';
    }
    else if (parseInt(value)) {
      return value;
    }
    else {
      return '"'+value+'"';
    }
  }

  return function(entry) {
    var pairs = [];

    _(entry).each(function(value, key) {
      if (_(value).isObject()) {
        key   = key + '_id';
        value = _(value).values()[0].id;
      }
      pairs.push([key, value]);
    });

    var columns = _.chain(pairs).pluck(0).value();
    var values  = _.chain(pairs).pluck(1).map(quote).value();

    var query = 'insert into ' + table + ' (' + columns.join(',') + ')' +
                '                   values (' + values.join(',')  + ')';
    return query;
  };
}

function handleError(e) {
  console.log(e);
}

var p = connection.allPages('/' + endpoint, endpoint, sqlInsertFor(endpoint)).then(function(result) {
  console.log(result);
  console.log('done');
}).fail(handleError).done(handleError);
