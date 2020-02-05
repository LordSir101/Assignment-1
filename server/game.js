
class Game{
  constructor(p1, p2){ //p1 is the player that was waiting,  p2 is the player that just entered
    this.players = [p1, p2];
    this.choices = [null, null];

    this.players.forEach((player, idx) => {
      player.on('chosen', (id) => {
        this.__display(idx, id);
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
}

module.exports = Game;
