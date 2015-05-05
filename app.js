var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

// sqlite3 code
var fs = require('fs');
var file = 'be_seasonal.db';
// var exists = fs.existsSync(file);
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database(file);
// var produceArray = [];

var routes = require('./routes/index');
var database = require('./routes/database');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// make produce array and db available to router
app.use(function(req,res, next){
    // req.produceArray = produceArray;
    req.db = db;
    next();
});

db.serialize(function(){

    // create produce table if doesn't already exist
    db.run("pragma foreign_keys=ON")
    db.run("CREATE TABLE IF NOT EXISTS produce (id INTEGER PRIMARY KEY NOT NULL, name TEXT, description TEXT, image_url TEXT)");
    db.run("CREATE TABLE IF NOT EXISTS january_produce (produce_id INT PRIMARY KEY, FOREIGN KEY (produce_id) REFERENCES produce(id))");
    db.run("CREATE UNIQUE INDEX IF NOT EXISTS unique_produce ON produce(name)");
});

app.use('/', routes);
app.use('/', database);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

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


module.exports = app;
