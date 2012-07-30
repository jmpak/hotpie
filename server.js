
/**
 * Module dependencies.
 */

require('coffee-script')

var express = require('express')
  , http = require('http')
  , path = require('path')
  , Memstore = express.session.MemoryStore
  , flash = require('connect-flash')
  , util = require('util');

var app = express();

module.exports = app;

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.set('view options', { layout: true });
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser());
  app.use(express.session({
    secret: "aasdfadsfdasfdsafdsafsdafdsa",
    store: Memstore({
      reapInterval: 60000 * 10
    })
  }));
  app.use(flash());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.configure('test', function(){
  app.set('port', 3001)
});

// Routes
require('./apps/authentication/routes')(app)

http.createServer(app).listen(app.settings.port, function(){
  console.log("Express server listening on port " + app.get('port'));
});

