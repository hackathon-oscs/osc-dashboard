module.exports = function(app) {
  require('./controllers/queries')(app);
  require('./controllers/constant')(app);
  require('./controllers/proxy')(app);
};
