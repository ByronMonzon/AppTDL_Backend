var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
const router = express.Router();

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var usersTasks = require('./routes/tasks');
var usersGoals = require('./routes/goals.js');
const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/desarrolloweb')

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
router.use((req, res, next)=>{
  if(req.headers.authorization && req.headers.authorization === '123456'){
    next();
  }else{
    res.status(401).json({'error': 'No se encontro autorización!'});
  }
});

app.use('/', router);
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/tasks', usersTasks);
app.use('/goals', usersGoals);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
