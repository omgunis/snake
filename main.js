$(function(){
  var canvas = document.getElementById("canvas");
  var ctx = canvas.getContext("2d");
  var w = canvas.width;
  var h = canvas.height;
  var p1score = 0;
  var p2score = 0;
  var speed = 10; //if speed is more than one, spaces are created between snakeArray
  var FPS = 10; //snakeArray moves every update, not speed
  var direction1 = 'up';
  var direction2;
  var tailArray = []; //array of SnakePieces that make the snake
  var twoPlayer = false;
  var food;
  var update;

  var head = new SnakePiece(450, 250, 'tomato');
  var tail = new SnakePiece(450, 260, 'lime');

  function Asset (xPos, yPos, playerColor) {
    this.x = xPos;
    this.y = yPos;
    this.color = playerColor;
  }

  function SnakePiece (xPos, yPos, color, heading) {
    this.x = xPos;
    this.y = yPos;
    this.height = 10;
    this.width = 10;
    this.color = color;
    this.heading = heading || "up";
    // this.speed = speed;
    this.draw = function(){
      console.log(this.heading);
      //player 1 movement
      if (direction1 == 'left') {
        this.heading = 'left';
        this.x -= speed;
      }
      else if (direction1 == 'up') {
        this.heading = 'up';
        this.y -= speed;
      }
      else if (direction1 == 'right') {
        this.heading = 'right';
        this.x += speed;
      }
      else if (direction1 == 'down') {
        this.heading = 'down';
        this.y += speed;
      }
      ctx.fillStyle = this.color;
      rect(this.x, this.y, this.height, this.width);
    }
  }

  //var player2 = new Asset(10, 250, 'blue');

  //splash screen
  function start(){
    ctx.font = "30px Arial";
    ctx.fillStyle = "red";
    ctx.fillText("SNAKE",10,50);

    //single player initiation
    var singlePlayer = document.querySelector("#singlePlayer");
    singlePlayer.addEventListener('click', function(){
      twoPlayer = false;
      singlePlayerinit();
    });

    //two player initiation
    twoPlayer = document.querySelector("#twoPlayer");
    twoPlayer.addEventListener('click', function(){
      twoPlayer = true;
      twoPlayerinit();
    });
  }
  start();

  function singlePlayerinit() {
    clear();
    createFood();
    direction1 = 'up';
    p1score = 0;
    p2score = 0;
    return update = setInterval(draw, 1000/FPS);//updates screen every 10 milliseconds creating illusion of movement
  }

  function twoPlayerinit() {
    clear();
    createFood();
    direction1 = 'up';
    direction2 = 'up';
    p1score = 0;
    p2score = 0;
    return update = setInterval(draw, 1000/FPS);//updates screen every 10 milliseconds creating illusion of movement
  }

  //creates new rectangles
  function rect(x,y,w,h) {
    ctx.beginPath();
    ctx.rect(x,y,w,h);
    ctx.closePath();
    ctx.fill();
  }

  function createFood(){
    food = new Asset(Math.round(Math.random() * 590), Math.round(Math.random() * 390), 'yellow');
  }

  function clear(){
    ctx.clearRect(0,0, w, h); //paints the canvas lightblue, called every frame
  }

  // function paint(){
  //     ctx.clearRect(0,0, w, h);
  //   //clears canvas every update
  //   //creates body
  //   for (var i=0; i < snakeArray.length; i++){
  //     var c = snakeArray[i];
  //     ctx.fillStyle = 'tomato';
  //     rect(c.x*10, c.y*10, 10, 10);
  //   }
  //
  //   var nx = snakeArray[0].x;
  //   var ny = snakeArray[0].y;
  //
  //   if (direction1 == 'left') {
  //     nx-=speed;
  //   }
  //   else if (direction1 == 'up') {
  //     ny-=speed;
  //   }
  //   else if (direction1 == 'right') {
  //     nx+=speed;
  //   }
  //   else if (direction1 == 'down') {
  //     ny+=speed;
  //   }
  //
  //   var tail = snakeArray.pop(); //pops out last cell
  //   tail.x = nx;
  //   tail.y = ny;
  //   snakeArray.unshift(tail); //puts cell back in the front
  // }
  // paint();
  function draw(){
    clear();
    head.draw();
    tail.draw();

    //draw player 2
    if(twoPlayer == true){
      ctx.fillStyle = player2.color;
      rect(player2.x, player2.y, 10,10);
    }
    //draw food
    ctx.fillStyle = "rgb(255, 255, 102)";
    rect(food.x, food.y, 10, 10);

    //game over if border is touched
    if (head.x > w - 10 || head.x < 1 || head.y > h - 10 || head.y < 1){
      console.log("DEAD");
      clearInterval(update); //stops animation
      alert('BLUE WINS!');
    }
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

    //gets player 1 keyboard input
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

    //player 1 collision
    //checks boundaries, new food created, score increase
    if(head.x <= food.x + 10 && head.x >= food.x - 10 &&
       head.y <= food.y + 10 && head.y >= food.y - 10){
       createFood();
       p1score += 1;
       document.getElementById("scorePlayer1").innerHTML = p1score;
       console.log('touch');
    }

    //player 2 collision
    //checks boundaries, new food created, score increase
    if(twoPlayer ==true){
      if(player2.x <= food.x + 10 && player2.x >= food.x - 10&&
         player2.y <= food.y + 10 && player2.y >= food.y - 10){
         createFood();
         p2score += 1;
         document.getElementById("scorePlayer2").innerHTML = p2score;
         console.log('touch');
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
