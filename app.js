var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var generateSafeId = require('generate-safe-id');

var index = require('./routes/index');
var callforpapers = require('./routes/callforpapers');
var previousateliers = require('./routes/previousateliers');
var sponsors = require('./routes/sponsors');

var app = express();

// view engine setup
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

//Cookie setup
app.set('trust proxy', 1) // trust first proxy 
app.use(session({
  genid: function(_req) {
    return generateSafeId(); // use UUIDs for session IDs
  },
  secret: 'atelier',
  resave: false,
  saveUninitialized: false
}));

//Log each request to the console, tagged with the session id
app.use(function(req, res, next) {
  var start = process.hrtime.bigint();
  res.on('finish', function() {
    var ms = Number(process.hrtime.bigint() - start) / 1e6;
    console.log('[' + new Date().toISOString() + '] ' + req.sessionID + ' ' + res.statusCode + ' ' +
      req.method + ' ' + req.originalUrl + ' ' + ms.toFixed(3) + ' "' + (req.get('user-agent') || '-') + '"');
  });
  next();
});

app.use(function(req, res, next) {
  res.header('X-Clacks-Overhead', 'GNU Terry Pratchett');
  next();
});

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/sponsors', sponsors);
app.use('/callforpapers', callforpapers);
app.use('/previousateliers', previousateliers);

// catch 404 and forward to error handler
app.use(function(_req, _res, next, err) {
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, _next) {
  // set locals, only providing error in development
  res.locals.message = err.error;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render(err.error);
});

module.exports = app;
