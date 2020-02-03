// Dependencies

var express = require('express');
var http = require('http');
var path = require('path');
var socketIO = require('socket.io');
var app = express();
var server = http.Server(app);
var io = socketIO(server);
app.set('port', 3000);

// Startup
app.use(express.static(path.join(__dirname, '../client')));

server.listen(3000, function() {
  console.log('Starting server on port 3000');
});
