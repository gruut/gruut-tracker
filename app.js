require('dotenv').config();

const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const redis = require('redis');
const redisTest = require('redis-mock');

const indexRouter = require('./routes/index');
const CronJob = require('./schedules/index');

if (process.env.NODE_ENV === 'test') {
  global.redisClient = redisTest.createClient();
} else {
  global.redisClient = redis.createClient();
}
CronJob.start();

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.send(err.status || 500);
});

app.listen(process.env.PORT);

module.exports = app;
