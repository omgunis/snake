var randomX = Math.floor(Math.random() * 590); //random x position for food
var randomY = Math.floor(Math.random() * 390); //random y position for food

var rightDown = false;
var leftDown = false;

function init() {
  return setInterval(draw, 500); //updates screen every 10 milliseconds creating illusion of movement
}
init();

//creates your own rectangle
function rect(x,y,w,h) {
  ctx.beginPath();
  ctx.rect(x,y,w,h);
  ctx.closePath();
  ctx.fill();
}
function clear() {
  ctx.clearRect(0, 0, w, h);
}

//not working
function draw(){
  var canvas = document.getElementById("canvas");
  var ctx = canvas.getContext('2d');
  var x = 0;
  var y = 0;
  var speed = 10;
  var player = {
        x: 450, //x start pos
        y: 250, //y start pos
        speed: 10,
        color: 'red',
        draw: function(){
          ctx.fillStyle = this.color;
          ctx.fillRect(this.x, this.y, 10, 10);
        }
      };
}

//getting keyboard input
$(document).keydown(onKeyDown);
$(document).keyup(onKeyUp);

function onKeyUp(evt) {
  if (evt.keyCode == 39)
    rightDown = false;
  else if (evt.keyCode == 37)
    leftDown = false;
}

//draws
player.draw();
food.draw();


var food = {
  x: randomX,
  y: randomY,
  color: 'yellow',
  draw: function(){
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, 10, 10);
  }
};

//working, but clears entire screen
function clear(){
  ctx.fillStyle = 'lightblue';
  ctx.fillRect(0,0,canvas.width,canvas.height);
}

//working keyboard input
function doKeyDown(event){
  if (event.keyCode === 39){
    clear();
    player.draw();
    player.x += player.speed;
    window.requestAnimationFrame(doKeyDown);
    console.log("right key pressed");
  }
  if (event.keyCode == 37){
  clear();
  player.draw();
  player.x -= player.speed;
  window.requestAnimationFrame(doKeyDown);
  console.log("Left key pressed");
  }
  if (event.keyCode == 38){
    clear();
    playerY -= 10;
    player.fillRect(playerX, playerY, 10, 10);
    console.log("Up key pressed");
  }
  if (event.keyCode == 40){
    clear();
    playerY += 10;
    player.fillRect(playerX, playerY, 10, 10);
    console.log("Down key pressed");
  }
}

$(document).keyup(onKeyUp);
function onKeyUp(evt) {
  if (evt.keyCode == 39)
    right = true;
  else if (evt.keyCode == 37)
    left = true;
}

//animates?
window.requestAnimationFrame(doKeyDown);
