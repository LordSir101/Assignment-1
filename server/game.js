
class Game {
  constructor(p1, p2){ //p1 is the player that was waiting,  p2 is the player that just entered
    this.players = [p1, p2];
    this.choices = [null, null];
    this.score = [0, 0];

    // Add event listeners to check when players make their choice
    this.players.forEach((player, idx) => {
      player.on('chosen', (id) => {
          this.players.forEach((player) => {
            player.emit("hideChoices");
          });
        this.__display(idx, id);
        this.makeChoice(player, id);

      });
    });

    // Add event listeners to check for player messages
    this.players.forEach((player)=>{
      player.on("message", (text)=>{
        this.__sendMessageToPlayers(text);
      });
    });

    this.__sendMessageToPlayers("Server: The game can start");
  }

  // Tell sockets if the enemy has chosen
  __display(idx, id) {
    if(idx == 0){
      this.players[1].emit("enemyChosen", id);
    }
    else {
      this.players[0].emit("enemyChosen", id);
    }
  }

  // Stores the choices of both players
  makeChoice (player, choice) {
    if (player == this.players[0])
      this.choices[0] = choice;
    else
      this.choices[1] = choice;
    if (this.choices[0] != null && this.choices[1] != null) {
      this.players.forEach((player) => {
        player.emit("showChoices");
      });

      if (this.choices[0] == this.choices[1]) {
        console.log("Tie");
      } else {

        // Decides the winner
        var winner = -1;
        switch (this.choices[0] + this.choices[1]) {
          case "rockpaper":
            console.log("Player 2 wins!");
            winner = 1;
            break;
          case "rockscissors":
            console.log("Player 1 wins!");
            winner = 0;
            break;
          case "paperrock":
            console.log("Player 1 wins!");
            winner = 0;
            break;
          case "paperscissors":
            console.log("Player 2 wins!");
            winner = 1;
            break;
          case "scissorsrock":
            console.log("Player 2 wins!");
            winner = 1;
            break;
          case "scissorspaper":
            console.log("Player 1 wins!");
            winner = 0;
            break;
        }

        // Increase the winner's score by 1
        this.score[winner] += 1;
      }

      // Reset game
      this.choices[0] = null;
      this.choices[1] = null;

      // Send the score to clients
      this.players.forEach((player, idx) => {
        if(player == this.players[1]){
          player.emit('score', this.score[1], this.score[0]);
        }
        else{
          player.emit('score', this.score[0], this.score[1]);
        }

      });

    }
    else{
      this.__sendMessageToPlayers("Server: A new game has started");
    }

  }//end make choice

  __sendMessageToPlayers(text){
    console.log("here");
    this.players.forEach((player) => {
      player.emit("writeMessage", text)
    });
  }
}

module.exports = Game;
