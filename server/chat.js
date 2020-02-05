
class Chat{
  constructor(p1, p2){

    this.players = [p1, p2];

    this.players.forEach((player)=>{
      player.on("message", (text)=>{
        this.__sendMessageToPlayers(text);
      });
    })
  }

  __sendMessageToPlayers(text){
    console.log("here");
    this.players.forEach((player) => {
      player.emit("writeMessage", text)
    });
  }
}

module.exports = Chat
