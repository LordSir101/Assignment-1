
class Game {
  constructor (player1, player2) {
    this.player1 = player1;
    this.choice1 = null;
    this.player2 = player2;
    this.choice2 = null;
  }

  endGame (winner) {

  }

  makeChoice (player, choice) {
    if (player == this.player1)
      this.choice1 = choice;
    else
      this.choice2 = choice;
    if (this.choice1 != null && this.choice2 != null) {
      if (this.choice1 == this.choice2) {
        console.log("Tie");
      } else {
        switch (this.choice1 + this.choice2) {
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
      this.choice1 = null;
      this.choice2 = null;

    }

  }

}

module.exports = Game;
