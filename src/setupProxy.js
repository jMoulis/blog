const proxy = require('http-proxy-middleware');

module.exports = function Api(app) {
  app.use(proxy('/auth', { target: 'http://localhost:9000' }));
  app.use(proxy('/api', { target: 'http://localhost:9000' }));
};
