// Require dependencies
var express    = require('express');
var bodyParser = require('body-parser');
var mongoose   = require('mongoose');
var swig 	   = require('swig');


// Setup express instance
var app = express();

// Load server config, add dependencies 
var config = require('./config.js')(express, app, bodyParser, mongoose, swig);

// Include all routes
var routes = require('./app/routes');

// Apply the routes to our application
app.use('/', routes);

// Add port for application, env port or default
var port = process.env.PORT || 1337;

// Start the server
var server = app.listen(port, function () {
    console.log('Express server listening on port %s', port);
});