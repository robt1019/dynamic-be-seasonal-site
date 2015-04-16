var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

// sqlite3 code
var fs = require('fs');
var file = 'test.db';
var exists = fs.existsSync(file);
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database(file);

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.jsondom ());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// create table if doesn't already exist
// populate database with random guff
db.serialize(function(){
    if(!exists){
        db.run("CREATE TABLE Stuff (thing TEXT)");
    }

    var statement = db.prepare("INSERT INTO Stuff VALUES (?)");

    //Insert random data
        var rand;
        for(var i=0; i<10; i++){
            rand = Math.floor(Math.random() * 100000000);
            statement.run("Thing #" + rand);
        }

    statement.finalize();

    db.each("SELECT rowid AS id, thing FROM Stuff", function(err, row){
        console.log(row.id + ": " + row.thing);
    });

});

app.use('/', routes);
app.use('/users', users);

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
