$(function(){
  var canvas = document.getElementById("canvas");
  var ctx = canvas.getContext("2d");
  var w = canvas.width;
  var h = canvas.height;
  var FPS = 100; //snakeArray moves every update, not speed
  var speed = 1; //if speed is more than one, spaces are created between snakeArray
  var p1score = 0;
  var p2score = 0;
  var twoPlayer = false;
  var direction1 = 'up';
  var direction2;
  var update;
  var snakeArray; //array of cells that make the snake
  var food;

  //used to make food
 function Asset (xPos, yPos, playerColor) {
   this.x = xPos;
   this.y = yPos;
   this.height = 10;
   this.width = 10;
   this.color = playerColor;
 }

  function start(){
    ctx.font = "30px Arial";
    ctx.fillStyle = "red";
    ctx.fillText("SNAKE",10,50);
    var singlePlayer = document.querySelector("#singlePlayer");
    singlePlayer.addEventListener('click', function(){
      twoPlayer = false;
      singlePlayerinit();
    });
    twoPlayer = document.querySelector("#twoPlayer");
    twoPlayer.addEventListener('click', function(){
      twoPlayer = true;
      twoPlayerinit();
    });
  }
  start();
  function create_snake1(){
    var length = 5; //initial length of snake
    snakeArray = []; //start with empty array
    for (var i=0; i <= length; i++){
      //creates a vertical snake moving up
      snakeArray.push({x:50, y:i+25});
    }
  }
  //runs if single player is selected in start
  function singlePlayerinit() {
    clear();
    create_snake1();
    createFood();
    direction1 = 'up';
    p1score = 0;
    p2score = 0;
    return update = setInterval(draw, FPS);//updates screen every 10 milliseconds creating illusion of movement
  }
  //runs if two player is selected in start
  function twoPlayerinit() {
    clear();
    createFood();
    direction1 = 'up';
    direction2 = 'up';
    p1score = 0;
    p2score = 0;
    return update = setInterval(draw, 1000/FPS);//updates screen every 10 milliseconds creating illusion of movement
  }
  //Creates rectangles
  function rect(x,y,w,h) {
    ctx.beginPath();
    ctx.rect(x,y,w,h);
    ctx.closePath();
    ctx.fill();
  }
  //creates food
  function createFood(){
    food  = {
      x: Math.round(Math.random() * 590), //random x position for food
      y: Math.round(Math.random() * 390),
      color: "rgb(255, 255, 102)"
    };
  }
  //paints the canvas lightblue
  //called at every update frame
  function clear(){
    ctx.clearRect(0,0, w, h);
  }

  function draw(){
    clear();
    ctx.clearRect(0,0, w, h);

    //draws player 1
    for (var i=0; i < snakeArray.length; i++){
      var c = snakeArray[i];
      ctx.fillStyle = 'tomato';
      rect(c.x*10, c.y*10, 10, 10);
    }

    var nx = snakeArray[0].x;
    var ny = snakeArray[0].y;

    //snake direction
    if (direction1 == 'left') {
      nx-=speed;
    }
    else if (direction1 == 'up') {
      ny-=speed;
    }
    else if (direction1 == 'right') {
      nx+=speed;
    }
    else if (direction1 == 'down') {
      ny+=speed;
    }
    //x and y positions are updated every frame, but cells are not//
    var tail = snakeArray.pop(); //pops out last cell
    tail.x = nx;
    tail.y = ny;
    snakeArray.unshift(tail); //puts cell back in the front
    //tail becomes new head every frame

    //game over if border is touched
    if (nx > w || nx < 0 || ny > h || ny < 0){
      console.log("DEAD");
      clearInterval(update); //stops animation
      alert('BLUE WINS!');
    }

    //draw food
    ctx.fillStyle = "rgb(255, 255, 102)";
    rect(food.x, food.y, 10, 10);

    //clear food if touching player
    if(nx <= food.x + 10 && nx >= food.x - 10&&
       ny<= food.y + 10 && ny >= food.y - 10){
      createFood();
      p1score += 1;
      document.getElementById("scorePlayer1").innerHTML = p1score;
      console.log('touch');
    }

    //player 2 draw
    if(twoPlayer == true){
      ctx.fillStyle = player2.color;
      rect(player2.x, player2.y, 10,10);
    }

    //player 2 collect food
    if(twoPlayer ==true){
      if(player2.x <= food.x + 10 && player2.x >= food.x - 10&&
         player2.y <= food.y + 10 && player2.y >= food.y - 10){
        createFood();
        p2score += 1;
        document.getElementById("scorePlayer2").innerHTML = p2score;
        console.log('touch');
      }
    }

    //player2 collision
    if(twoPlayer == true){
      if (player2.x > w - 10 || player2.x < 1 || player2.y > h - 10 || player2.y < 1){
        console.log("DEAD");
        clearInterval(update); //stops animation
        alert('RED WINS!');
      }
    }

    //player 2 movement
    if (twoPlayer == true){
      if (direction2 == 'left') {
        player2.x -= speed;
      }
      if (direction2 == 'up') {
        player2.y -= speed;
      }
      if (direction2 == 'right') {
        player2.x += speed;
      }
      if (direction2 == 'down') {
        player2.y += speed;
      }
    }
  }

  //player 1 keyboard input
  $(document).keydown(function(evt) {
    if (evt.keyCode == 37){
      direction1 = 'left';
    }
    else if (evt.keyCode == 38){
      direction1 = 'up';

    }
    else if (evt.keyCode == 39){
      direction1 = 'right';

    }
    else if (evt.keyCode == 40){
      direction1 = 'down';
    }
  });

  //gets player 2 keyboard input
  if(twoPlayer == true){
    $(document).keydown(function(evt) {
      if (evt.keyCode == 65){
        direction2 = 'left';
      }
      else if (evt.keyCode == 87){
        direction2 = 'up';
      }
      else if (evt.keyCode == 68){
        direction2 = 'right';

      }
      else if (evt.keyCode == 83){
        direction2 = 'down';
      }
    });
  }
}) //end of iffe
