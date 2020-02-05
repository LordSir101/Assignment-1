var sock =io();

var canvas = document.getElementById('canvas1');
var ctx = canvas.getContext('2d');

var choiceImg = document.createElement('img');
var enemyImg = document.createElement('img');
//choiceImg.src = ;
var w = canvas.width;
var h = canvas.height;

//add button listners for each choice
const addButtonListeners = () => {
  ['rock', 'paper', 'scissors'].forEach((id) => {
    const button = document.getElementById(id);
    button.addEventListener('click', () =>{
      console.log("button pressed");
      choiceImg.src = "images/"+id+".png";
      sock.emit('chosen', id);
    });
  });
};

sock.on("enemyChosen", (id)=>{
  enemyImg.src = "images/enemy"+id+".png";
});

var animation;

function animationLoop(){
  clear();
  drawBackground();
  drawImage();

  animation = requestAnimationFrame(animationLoop);
}

function drawBackground(){
  ctx.fillStyle = "orange";
  ctx.fillRect(0, 0, w, h);
}

function drawImage(){
  ctx.drawImage(choiceImg, w/4, h/2, 200, 200);
  ctx.drawImage(enemyImg, w - w/4, h/2, 200, 200);
}

function clear(){
  ctx.clearRect(0, 0, w, h);
}

addButtonListeners();
animationLoop();
