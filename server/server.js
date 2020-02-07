//****Assignment 1***

// Dependancies

const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const Game = require('./game.js');
const app = express();

// Assign the working directory
const clientPath = `${__dirname}/../Client`; //Note you have to use these quotes ``
console.log(`serving static from ${clientPath}`);
app.use(express.static(clientPath));

// Create the server
const server = http.createServer(app);
const io = socketio(server);

// Declare variables
var waitingPlayer = null;
var game;
var chat;

// Socket events
io.on('connection', (sock) => {

  // If there is already a player create a game
  if(waitingPlayer){
    game = new Game(waitingPlayer, sock);
    console.log("game can start");
    waitingPlayer = null;
  }

  // If there is no waiting player assign value of socket to it
  else {
    waitingPlayer = sock;
    console.log("waiting for player");
  }

  // When a waiting player disconnects set it to null
  sock.on('disconnect', () => {
    if (waitingPlayer == sock)
      waitingPlayer = null;
  });

});

//server event listeners------------------------------------------------------------------
server.on('error', (err) =>{
  console.error('server error:' + err);
});

server.listen(3000, 'localhost');
//server.listen(8080);
console.log("rps started on 3000");
