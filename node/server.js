// server.js

// set up ======================================================================
// get all the tools we need
var port = process.env.PORT || 3000;
var express = require('express');
var app = express();
var cors = require('cors');
var routes = require('./routes');
var path = require('path');
var mongoose = require('mongoose');
var configDB = require('./config/mongodb');
var logger = require('./utils').logan;

// configuration ===============================================================
var dbConnection = mongoose.connect(configDB.url).connection; // connect to our database:

// set up our express application
app.configure(function () {
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.logger('dev'));
});

app.configure('development', function () {
  app.use(express.errorHandler({
    dumpExceptions: true,
    showStack: true
  }));
  // Populate empty DB with sample data
  require('./config/dummydata');
});

app.configure('production', function () {
  app.use(express.errorHandler());
});

dbConnection.on('error', console.error.bind(console, 'connection error:'));
dbConnection.once('open', function () {
  // Enable CORS for everything
  app.use(cors());
  app.options('*', cors());

  // Set app.router
  app.use(app.router);

  // Routes
  app.get('/api/:resource/:id', routes.read);
  app.get('/api/:resource', routes.list);
  app.post('/api/:resource', routes.create);
  app.put('/api/:resource/:id', routes.update);
  app.del('/api/:resource/:id', routes.del);

  app.listen(port, function () {
    logger.success('Congrats! Open http://localhost:' + port + '!');
  });
});