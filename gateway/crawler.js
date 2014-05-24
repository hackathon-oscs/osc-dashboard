var config     = require('./lib/config');
var connection = require('./lib/services/connection').build(config.api_path);

var endpoint = process.argv[2];

function identity(v) {
  return v;
}

function sqlInsert(entry) {
  return "insert yo mama" + entry.situacao;
}

function handleError(e) {
  console.log(e);
}

var p = connection.allPages('/' + endpoint, endpoint, sqlInsert).then(function(result) {
  console.log(result);
  console.log('done');
}).fail(handleError).done(handleError);
