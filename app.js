const express = require('express');
const mongoose = require('mongoose')
const createError = require('http-errors');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const indexRouter = require('./routes/index');
const { redisClient } = require('./connection/redis.connection');
const app = express();

mongoose.connect("mongodb://localhost:27017/share_Spotify_PlayList", {
  // useUnifiedTopology: true,
  // useNewUrlParser: true,
  // useFindAndModify: false,
}).then(() => {
  console.log('Connected to the mongoDB...');
}).catch((err) => console.log({ message: err.message, stack: err.stack }));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => { next(createError(404)) });
// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = { app, redisClient }