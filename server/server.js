const http = require('http');
const express = require('express');
const socketio = require('socket.io');
//const Events = require('./serverEvents');
var Game = require('./game.js');


const app = express();

const clientPath = `${__dirname}/../Client`; //Note you have to use these quotes ``
console.log(`serving static from ${clientPath}`);

app.use(express.static(clientPath));

const server = http.createServer(app);

const io = socketio(server);

var player1 = null;
var player2 = null;
var game;

io.on('connection', (sock) => {
  if(player1){
    player2 = sock;
    game = new Game(player1.id, player2.id);
    console.log("game can start");
  }
  else{
    player1 = sock;
    console.log("waiting for player");
  }
  var choice = null;
  sock.on('choice', (data) => {
    game.makeChoice(sock.id, data)
  });

  sock.on('disconnect', () => {
    if (player1.id == sock.id)
      player1 = null;
    else player2 = null

  });

});

//server event listeners------------------------------------------------------------------
server.on('error', (err) =>{
  console.error('server error:' + err);
});

server.listen(3000, 'localhost');
//server.listen(8080);
console.log("rps started on 3000");
