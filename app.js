var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

// sqlite3 code - new
var fs = require('fs');
var file = 'be_seasonal.db';
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database(file);

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

// make produce array and db available to router - new
app.use(function(req,res, next){
    req.db = db;
    next();
});

// set up database if not already done - new
db.serialize(function(){

    db.run("pragma foreign_keys=ON")
    db.run("CREATE TABLE IF NOT EXISTS produce (id INTEGER PRIMARY KEY NOT NULL, name TEXT, description TEXT, image_url TEXT)");
    db.run("CREATE TABLE IF NOT EXISTS months (id INTEGER PRIMARY KEY NOT NULL, name TEXT, produce_id, FOREIGN KEY (produce_id) REFERENCES produce(id))");
    db.run("CREATE UNIQUE INDEX IF NOT EXISTS unique_produce ON produce(name)");
    db.run("CREATE UNIQUE INDEX IF NOT EXISTS unique_produce ON months(name, produce_id)");

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
