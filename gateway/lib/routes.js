module.exports = function(app) {
  require('./controllers/constant')(app);
  require('./controllers/proxy')(app);
};
