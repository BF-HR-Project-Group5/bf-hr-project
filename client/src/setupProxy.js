const proxy = require('http-proxy-middleware');
const PORT = 8000; // port of the server app

module.exports = function (app) {
  app.use(proxy('/user/login', { target: `http://localhost:${PORT}/` }));
  app.use(proxy('/user/register/*', { target: `http://localhost:${PORT}/` }));
  app.use(proxy('/user/logout', { target: `http://localhost:${PORT}/` }));
  app.use(proxy('/house', { target: `http://localhost:${PORT}/` }));
  app.use(proxy('/house/*', { target: `http://localhost:${PORT}/` }));
  app.use(proxy('/report/*', { target: `http://localhost:${PORT}/` }));
  app.use(proxy('/report/*/comment', { target: `http://localhost:${PORT}/` }));
  app.use(proxy('/comment/*', { target: `http://localhost:${PORT}/` }));
  app.use(proxy('/document/*', { target: `http://localhost:${PORT}/` }));
  app.use(proxy('/documents/*/approve', { target: `http://localhost:${PORT}/` }));
  app.use(proxy('/documents/*/reject', { target: `http://localhost:${PORT}/` }));
  app.use(proxy('/profile/*', { target: `http://localhost:${PORT}/` }));
  app.use(proxy('/profile/create', { target: `http://localhost:${PORT}/` }));
  app.use(proxy('/profiles/*', { target: `http://localhost:${PORT}/` }));
  app.use(proxy('/profiles/*/sendReminder', { target: `http://localhost:${PORT}/` }));
  app.use(proxy('/invites/send', { target: `http://localhost:${PORT}/` }));
  app.use(proxy('/invites', { target: `http://localhost:${PORT}/` }));
  app.use(proxy('/profiles/*/reject', { target: `http://localhost:${PORT}/` }));
  app.use(proxy('/profiles/*/approve', { target: `http://localhost:${PORT}/` }));
  app.use(proxy('/houses/*', { target: `http://localhost:${PORT}/` }));
};

