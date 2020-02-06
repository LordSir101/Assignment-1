var sock =io();

var canvas = document.getElementById('canvas1');
var ctx = canvas.getContext('2d');

var choiceImg = document.createElement('img');
var enemyImg = document.createElement('img');

var w = canvas.width;
var h = canvas.height;

var playerScore = 0;
var enemyScore = 0;

var animation;
var showChoices = false;

//add button listners for each choice
const addButtonListeners = () => {
  ['rock', 'paper', 'scissors'].forEach((id) => {
    const button = document.getElementById(id);
    button.addEventListener('click', () =>{
      //set player image source
      choiceImg.src = "images/"+id+".png";
      sock.emit('chosen', id);
    });
  });
};

sock.on("enemyChosen", (id)=>{
  //set opponent image source
  enemyImg.src = "images/enemy"+id+".png";
});

sock.on("showChoices", ()=>{
  showChoices = true;
});
sock.on("hideChoices", ()=>{
  showChoices = false;
});

sock.on('score', (score, oppScore) => {
  playerScore = score;
  enemyScore = oppScore
  console.log(score + ", " + oppScore);
});



//main game loop
function animationLoop(){
  clear();
  drawBackground();
  displayScore();
  if(showChoices == true){
    drawImages();
  }

  animation = requestAnimationFrame(animationLoop);
}

function drawBackground(){
  ctx.fillStyle = "orange";
  ctx.fillRect(0, 0, w, h);
}

function drawImages(){
  ctx.drawImage(choiceImg, w/10, h/2, 200, 200);
  ctx.drawImage(enemyImg, w - enemyImg.width - w/10, h/2, 200, 200);
}

function clear(){
  ctx.clearRect(0, 0, w, h);
}

function displayScore(){

  //measure text width
  var scoreWidth = ctx.measureText(playerScore).width;
  var scoreWidth2 = ctx.measureText(enemyScore).width;


  ctx.textAlign = 'left'; //bases the poition of the text from the top left corner
  ctx.textBaseline = 'top';
  ctx.fillStyle = "white";
  ctx.lineWidth = 1;

  ctx.strokeStyle = "black";
  ctx.miterLimit = 2; //defines how far outline extends on sharp corners
  ctx.lineJoin = 'circle';

  ctx.font = "35px sans-serif"
  ctx.fillText("You:", w/8 - ctx.measureText("You:").width/2, (h - h/6) - 20);
  ctx.fillText("Opponent:", w - ctx.measureText("Opponent:").width/2 - w/8, (h - h/6) - 20);

  ctx.strokeText("You:", w/8 - ctx.measureText("You:").width/2, (h - h/6) - 20);
  ctx.strokeText("Opponent:", w - ctx.measureText("Opponent:").width/2 - w/8, (h - h/6) - 20);

  ctx.font = "45px sans-serif";
  ctx.fillText(playerScore, w/8 - scoreWidth/2, (h - h/6) + 20);
  ctx.fillText(enemyScore, w - scoreWidth2/2 - w/8, (h - h/6) + 20);

  ctx.strokeText(playerScore, w/8 - scoreWidth/2, (h - h/6) + 20);
  ctx.strokeText(enemyScore, w - scoreWidth2/2 - w/8, (h - h/6) + 20);
}

document.querySelector('#chat-form').addEventListener('submit', onFormSubmitted);

function onFormSubmitted(e){
  e.preventDefault();

  const input = document.querySelector('#chat');
  const text = input.value;

  input.value = ""; //clears the input field

  //sends message to sock object in the server
  sock.emit('message', text);
}

sock.on("writeMessage", (text)=>{

  const parent = document.querySelector('#events'); //returns first element that matches the argument
  const el = document.createElement('li');
  const line = document.createElement('hr');
  el.innerHTML = text;

  //adds the new list element to <ul>
  parent.appendChild(el);
  parent.appendChild(line);
})

addButtonListeners();
animationLoop();
