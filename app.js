var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

// sqlite3 code
var fs = require('fs');
var file = 'be_seasonal.db';
var exists = fs.existsSync(file);
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database(file);
var produceArray = [];

var routes = require('./routes/index');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// make produce array available to router
app.use(function(req,res, next){
    req.produceArray = produceArray;
    next();
});

// create table if doesn't already exist
db.serialize(function(){
    if(!exists){
        db.run("CREATE TABLE produce (name TEXT, description TEXT, image_url TEXT)");
    }
    
    // load existing database into produceArray
    db.each("SELECT name, description FROM produce", function(err, row){
        produceArray.push({ name: row.name, description: row.description });
    });

    // // insert dummy data into database
    // var statement = db.prepare("INSERT INTO  produce VALUES (?, ?, ?)");

    // statement.run("Apple", "Delicious", "apple.png");
    // statement.run("Banana", "Also Delicious", "banana.png");

    // statement.finalize();
});

app.use('/', routes);

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
