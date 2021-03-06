require('dotenv').config();
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var methodOverride = require("method-override");
const session = require('express-session');
const localsUser = require('./middlewares/localsUser');

const dbConnectionTest = require('./utils/dbConnectionTest')
dbConnectionTest();


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var productsRouter = require('./routes/products');
var adminRouter = require('./routes/admin');
var apiProductsRouter = require('./routes/api/products');
var apiUsersRouter = require('./routes/api/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '..' , 'public')));
app.use(methodOverride('_method'));

/* levanta sesion*/
app.use(session({
  secret : 'top secret viteh',
  saveUninitialized : true,
  resave : false,
}));

app.use(localsUser);

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/products', productsRouter);
app.use('/admin', adminRouter);

// api routes
app.use('/api',apiProductsRouter,apiUsersRouter);
app.use('/api/product_user', require('./routes/api/product_user'))

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
