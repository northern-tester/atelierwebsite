var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var fs = require('fs');
var rfs = require('rotating-file-stream');
var session = require('express-session');
var generateSafeId = require('generate-safe-id');

var index = require('./routes/index');
var callforpapers = require('./routes/callforpapers');
var previousateliers = require('./routes/previousateliers');
var thankyou = require('./routes/thankyou');
var test = require('./routes/test');
var sponsors = require('./routes/sponsors');
var robot = require('./routes/robot');

var app = express();

//Get the log directory
var logDirectory = path.join(__dirname, 'logs');

//Create a rotating write stream
var accessLogStream = rfs('access.log', {
	interval: '1d', 
	path: logDirectory
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

//Cookie setup
app.set('trust proxy', 1) // trust first proxy 
var sessionId;
app.use(session({
  genid: function(req) {
  	sessionId = generateSafeId();
    return sessionId; // use UUIDs for session IDs 
  },
  secret: 'atelier'
}));

//Lets set our log stream to have the same token as the cookie
logger.token('id', function getId(){
	return sessionId
});

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('[:date[clf]] :id :status :method :url :response-time ":user-agent"', {stream:accessLogStream}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/callforpapers', callforpapers);
app.use('/previousateliers', previousateliers);
app.use('/thankyou', thankyou);
app.use('/test', test);
app.use('/sponsors', sponsors);
app.use('/robot', robot);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render(err.message);
});

module.exports = app;
