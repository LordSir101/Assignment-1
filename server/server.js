const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const Events = require('./serverEvents');


const app = express();

const clientPath = `${__dirname}/../Client`; //Note you have to use these quotes ``
console.log(`serving static from ${clientPath}`);

app.use(express.static(clientPath));

const server = http.createServer(app);

const io = socketio(server);

var waitingPlayer = null;
io.on('connection', (sock) => {
  if(waitingPlayer){
    new Events(waitingPlayer, sock);
    console.log("game can start");
    waitingPlayer = null;
  }
  else{
    waitingPlayer = sock;
    console.log("waiting for player");
  }

});

//server event listeners------------------------------------------------------------------
server.on('error', (err) =>{
  console.error('server error:' + err);
});

server.listen(3000, '192.168.2.105');
//server.listen(8080);
console.log("rps started on 3000");
