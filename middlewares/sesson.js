var session = require('express-session');

module.exports = function (app) {
  app.use(session({
    secret: 'keybroad cat',
    resave: true,
    saveUninitialized: true
  }));
}