var _ = require('underscore');

var config     = require('./lib/config');
var connection = require('./lib/services/connection').build(config.api_path);
var fs = require('fs');

var endpoint = process.argv[2];


function sqlInsertFor(table) {
  function re(pattern) { return function(v) { return (new RegExp(pattern)).test(v); }; }
  function isNull(v)   { return v === null; }
  function always(c)   { return function(v) { return c; }; }
  function quote(v)    { return '"'+ String(v).replace(/['"]/g,'') +'"'; }
  function identity(v) { return v; }

  var quoteMap = [
    { check: isNull,                      quote: always('null') },
    { check: re(/^\d\d\d\d-\d\d-\d\d$/),  quote: quote          },
    { check: re(/^[0-9A-F]{40}$/),        quote: quote          },
    { check: re(/^-\d.*$/),               quote: identity       },
    { check: re(/[ \-\.\/]/),             quote: quote          },
    { check: parseFloat,                  quote: parseFloat      },
  ];
  function smartQuote(value) {
    for (var i = 0; i < quoteMap.length; i++) {
      var check = quoteMap[i].check.bind({}, value)();
      if (check) {
        return quoteMap[i].quote(value);
      }
    }
    return quote(value);
  }

  return function(entry) {
    var pairs = [];

    _(entry).each(function(value, key) {
      if (key === 'uf') {
        value = value.sigla;
      }
      else if (_(value).isObject()) {
        key   = key + '_id';
        value = _(value).values()[0].id || null;
      }
      return pairs.push([key, value]);
    });

    var columns = _.chain(pairs).pluck(0).value();
    var values  = _.chain(pairs).pluck(1).map(smartQuote).value();

    var query = 'insert into ' + table + ' (' + columns.join(',') + ')' +
                '                   values (' + values.join(',')  + ');';
    return query;
  };
}

function sqlCreateFor(table) {
  return function(entry) {
    var type = '';
    var columns = [];
    _(entry).each(function(value, key) {
      if (key === 'uf') {
        type = 'text';
      }
      else if (_(value).isObject()) {
        key   = key + '_id';
        type  = 'int';
      }
      else if (key === 'id') {
        type = 'int';
      }
      columns.push(key + ' ' + type);
    });

    var query = 'create table '+table+'('+ columns.join(',') +');';

    return query;
  };
}

function handleError(e) {
  console.log(e);
}

var p = connection.allPages('/' + endpoint, endpoint, sqlCreateFor(endpoint), sqlInsertFor(endpoint)).spread(function(header, result) {
  var content = header + "\n" + result.join('\n');
  fs.writeFileSync('output/'+endpoint+'.sql', content);
  console.log('output written to output/'+endpoint+'.sql');
}).fail(handleError).done(null, handleError);
