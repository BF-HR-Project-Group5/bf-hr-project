const proxy = require('http-proxy-middleware');
const PORT = 5000; // port of the server app

module.exports = function (app) {
  app.use(proxy('/user/*', { target: `http://localhost:${PORT}/` }));
  app.use(proxy('/house', { target: `http://localhost:${PORT}/` }));
  app.use(proxy('/house/*', { target: `http://localhost:${PORT}/` }));
  app.use(proxy('/report/*', { target: `http://localhost:${PORT}/` }));
  app.use(proxy('/report/*/comment', { target: `http://localhost:${PORT}/` }));
  app.use(proxy('/comment/*', { target: `http://localhost:${PORT}/` }));
  app.use(proxy('/documents/*/approve', { target: `http://localhost:${PORT}/` }));
  app.use(proxy('/documents/*/reject', { target: `http://localhost:${PORT}/` }));
  app.use(proxy('/profile/*', { target: `http://localhost:${PORT}/` }));
  app.use(proxy('/profiles/*', { target: `http://localhost:${PORT}/` }));
  app.use(proxy('/profiles/*/sendReminder', { target: `http://localhost:${PORT}/` }));
  app.use(proxy('/invites/send', { target: `http://localhost:${PORT}/` }));
  app.use(proxy('/invites', { target: `http://localhost:${PORT}/` }));
  app.use(proxy('/profiles/*/reject', { target: `http://localhost:${PORT}/` }));
};

