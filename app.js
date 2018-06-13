require('dotenv').config()

const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require('cors')
const basicAuth = require('basic-auth')
const bcrypt = require('bcrypt')

const app = express();
const bathrooms = require('./api/bathrooms')
const users = require('./api/users')
// const userQueries = require('./db/userQueries')
const auth = require('./db/auth')

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors({
  origin: 'http://localhost:3001',
  optionsSuccessStatus: 200
}))
app.use((req, res, next) => {
  req.auth = {
    isAuthenticated: false,
    user: {}
  }
  let authorization = req.headers.authorization
  if (authorization) {
    let credentials = basicAuth.parse(authorization)
    auth.authenticate(credentials.name, credentials.pass)
    .then(user => {
      req.auth.isAuthenticated = true
      req.auth.user = user
      next()
    })
    .catch(err => {
      err.status = 403
      next(err)
    })
  } else {
    next()
  }
})

app.use('/api/v1/bathrooms', bathrooms)
app.use('/api/v1/users', users)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  console.error(err)
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: req.app.get('env') === 'development' ? err : {}
  });
});

module.exports = app;
