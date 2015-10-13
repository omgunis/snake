$(function(){
  var canvas = document.getElementById("canvas");
  var ctx = canvas.getContext("2d");
  var w = canvas.width;
  var h = canvas.height;
  var player = canvas.getContext("2d");
  var FPS = 60;
  var x = 0;
  var y = 0;
  var p1score = 0;
  var p2score = 0;
  var speed = 3;
  var direction;
  var update;
  var eatean = [];
  var player;
  var food;


  function start(){
    ctx.font = "30px Arial";
    ctx.fillStyle = "red";
    ctx.fillText("SNAKE",10,50);
  }
  start();

  function init() {
    clear();
    createPlayer();
    createFood();
    direction = 'up';
    score = 0;
    return update = setInterval(draw, 1000/FPS);//updates screen every 10 milliseconds creating illusion of movement
  }
  // function initFood() {
  //    eaten = 0;
  //    food = new Array(eaten);
  // }
  function rect(x,y,w,h) {
    ctx.beginPath();
    ctx.rect(x,y,w,h);
    ctx.closePath();
    ctx.fill();
  }

  function createPlayer(){
    player  = {
      x: 450, //x start pos
      y: 250, //y start pos
      color: 'tomato'
    };
  }

  function createFood(){
    food  = {
      x: Math.floor(Math.random() * 590), //random x position for food
      y: Math.floor(Math.random() * 390),
      color: "rgb(255, 255, 102)"
    };
  }

  function draw(){
    clear();
    //draw player
    ctx.fillStyle = player.color;
    rect(player.x, player.y, 10,10);

    //game over
    if (player.x > w - 10 || player.x < 1 || player.y > h - 10 || player.y < 1){
      console.log("DEAD");
      clearInterval(update); //stops animation
      //alert('Play Again?');
    }

    //player movement
    if (direction == 'left') {
      player.x -= speed;
    }
    if (direction == 'up') {
      player.y -= speed;
    }
    if (direction == 'right') {
      player.x += speed;
    }
    if (direction === 'down') {
      player.y += speed;
    }

    //gets keyboard input
    $(document).keydown(function(evt) {
      if (evt.keyCode == 37){
        direction = 'left';
      }
      else if (evt.keyCode == 38){
        direction = 'up';
      }
      else if (evt.keyCode == 39){
        direction = 'right';

      }
      else if (evt.keyCode == 40){
        direction = 'down';
      }
    });

    //draw food
    ctx.fillStyle = "rgb(255, 255, 102)";
    rect(food.x, food.y, 10, 10);

    //clear food if touching player
    if(player.x <= food.x + 10 && player.x >= food.x - 10&&
       player.y <= food.y + 10 && player.y >= food.y - 10){
      createFood();
      score += 1;
      document.getElementById("scorePlayer1").innerHTML = score;
      console.log('touch');
    }

  }
  function clear(){
    ctx.clearRect(0,0, w, h);
  }
  //start();
  init();
}) //end of iffe
