const proxy = require('http-proxy-middleware');
const PORT = 5000; // port of the server app

module.exports = function (app) {
  app.use(proxy('/user/*', { target: `http://localhost:${PORT}/` }));
  app.use(proxy('/house', { target: `http://localhost:${PORT}/` }));
  app.use(proxy('/house/*', { target: `http://localhost:${PORT}/` }));
  app.use(proxy('/report/*', { target: `http://localhost:${PORT}/` }));
  app.use(proxy('/report/*/comment', { target: `http://localhost:${PORT}/` }));
  app.use(proxy('/comment/*', { target: `http://localhost:${PORT}/` }));
};

