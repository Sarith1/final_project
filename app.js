var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var fs = require('fs');
var pg = require('pg');
var session = require('express-session');
var app = express();
var sass = require( 'node-sass' )


sass.render( {
    file: '../public/stylesheets/style.scss'
}, (err, result) => { 
    fs.writeFile( '../public/stylesheets/style.css', result.css.toString(), ( err ) => {
        if ( err ) throw err
            console.log( 'Sass written to css' )
    } )
} )
// Session config
app.use(session({
  secret: 'oh wow very secret much security',
  resave: true,
  saveUninitialized: false,
  cookie: {
    expires: false
  }
}));
app.use(function(req,res,next){
  console.log('main triggered ' + Date.now())
  next()
})

// Get all routes
var routes = require('./routes/index');
var users = require('./routes/users');
//var profile = require('./routes/profile');
var addRecipe = require('./routes/addRecipe');
var search = require ('./routes/search')
var login = require ('./routes/login');
var register = require ('./routes/register');
//var logout = require ('./routes/logout');
var about = require ('./routes/about');
//var favorites = require ('./routes/favorites');

// Get database config
var db = require('./models/database')

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);
app.use('/login', login);
//app.use('/profile', profile);
app.use('/addRecipe', addRecipe);
app.use('/register', register);
app.use('/users', users);
app.use('/search', search);
//app.use('/logout', logout);
app.use('/about', about);

// Static files
app.use(express.static('./public'));
app.use('/search', express.static('./public'));




// // catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   var err = new Error('Not Found');
//   err.status = 404;
//   next(err);
// });

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

app.listen(3000)


module.exports = app;
