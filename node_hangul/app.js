const express = require('express'); 
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const compression = require('compression');
const cors = require('cors');
const routes = require('./routes/index');
const users = require('./routes/users');
const config = require('./config.json');

global.SRC_FILE = config.SRC_FILE || 'c:/temp/song_mst.txt';
global.SEARCH_TIMEOUT = config.SEARCH_TIMEOUT || 10000;
global.NUMBER_OF_WORKER = config.NUMBER_OF_WORKER || 5;
global.RESULT_LIMIT_WORKER = config.RESULT_LIMIT_WORKER || 1000;
global.INDEXING_BYTES = config.INDEXING_BYTES || Infinity;

const app = express();

// view engine setup1
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(compression());
app.use(cors());

//// add for logtracer
const env = app.get('env');
if(env === 'development'){
	
	console.log('development environment!!');
	
	var logTracer = require('tracer').console(
			{
				format : "{{timestamp}} [{{title}}] {{message}} (in {{file}}:{{line}})",	
				dateformat: 'yyyy-mm-dd HH:MM:ss',
				level:'trace'
			}
		);
}
////

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

global.logger = logTracer;
 
app.use('/', routes);
app.use('/users', users);
app.use('/load', require('./routes/load'));
app.use('/loadSong', require('./routes/loadSong')); 
app.use('/search', require('./routes/search'));
app.use('/searchSong', require('./routes/searchSong'));


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  const err = new Error('Not Found');
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
