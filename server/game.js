
class Game{
  constructor(p1, p2){ //p1 is the player that was waiting,  p2 is the player that just entered
    this.players = [p1, p2];
    this.choices = [null, null];

    this.players.forEach((player, idx) => {
      player.on('chosen', (id) => {
        this.__display(idx, id);
        this.makeChoice(player, id);

      });
    });
  }

  __display(idx, id){

    if(idx == 0){
      this.players[1].emit("enemyChosen", id);
    }
    else{
      this.players[0].emit("enemyChosen", id);
    }
  }

  makeChoice (player, choice) {
    if (player == this.players[0])
      this.choices[0] = choice;
    else
      this.choices[1] = choice;
    if (this.choices[0] != null && this.choices[1] != null) {
      if (this.choices[0] == this.choices[1]) {
        console.log("Tie");
      } else {
        switch (this.choices[0] + this.choices[1]) {
          case "rockpaper":
            console.log("Player 2 wins!");
            break;
          case "rockscissors":
            console.log("Player 1 wins!");
            break;
          case "paperrock":
            console.log("Player 1 wins!");
            break;
          case "paperscissors":
            console.log("Player 2 wins!");
            break;
          case "scissorsrock":
            console.log("Player 2 wins!");
            break;
          case "scissorspaper":
            console.log("Player 1 wins!");
            break;
        }

      }
      this.choices[0] = null;
      this.choices[1] = null;

    }

  }
}

module.exports = Game;
