const proxy = require('http-proxy-middleware');

module.exports = function Api(app) {
  app.use(proxy('/auth', { target: 'http://julienmoulis.io:7000' }));
  app.use(proxy('/api', { target: 'http://julienmoulis.io:7000' }));
};
