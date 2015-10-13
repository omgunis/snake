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
  var speed = 1; //if speed is more than one, spaces are created between snakeArray
  var direction1 = 'up';
  var direction2;
  var update;
  var eatean = [];
  var snakeArray; //array of cells that make the snake
  var player1;
  var player2;
  var twoPlayer = false;
  var food;

  //var Player = function(x, y, color) {
  //
  //
  //}
  //var player1 = new Player(0,0,'tomato'){
  //
  //}
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

  create_snake();
  function create_snake(){
    var length = 10; //initial length of snake
    snakeArray = []; //start with empty array
    for (var i=0; i <= length; i++){
      //creates a vertical snake moving up
      snakeArray.push({x:50, y:i+25});
    }
  }

  function singlePlayerinit() {
    clear();
    create_snake();
    createPlayer1();
    createFood();
    direction1 = 'up';
    p1score = 0;
    p2score = 0;
    return update = setInterval(draw, FPS);//updates screen every 10 milliseconds creating illusion of movement
  }
  function twoPlayerinit() {
    clear();
    createPlayer1();
    createPlayer2();
    createFood();
    direction1 = 'up';
    direction2 = 'up';
    p1score = 0;
    p2score = 0;
    return update = setInterval(draw, 1000/FPS);//updates screen every 10 milliseconds creating illusion of movement
  }

  function rect(x,y,w,h) {
    ctx.beginPath();
    ctx.rect(x,y,w,h);
    ctx.closePath();
    ctx.fill();
  }

  function createPlayer1(){
    player1  = {
      x: 0, //x start pos 450
      y: 0, //y start pos 50
      color: 'tomato'
    };
  }
  function createPlayer2(){
    player2  = {
      x: 50, //x start pos
      y: 250, //y start pos
      color: 'blue'
    };
  }

  function createFood(){
    food  = {
      x: Math.round(Math.random() * 590), //random x position for food
      y: Math.round(Math.random() * 390),
      color: "rgb(255, 255, 102)"
    };
  }

  function paint(){
      ctx.clearRect(0,0, w, h);
    //clears canvas every update
    //creates body
    for (var i=0; i < snakeArray.length; i++){
      var c = snakeArray[i];
      ctx.fillStyle = 'tomato';
      rect(c.x*10, c.y*10, 10, 10);
    }

    var nx = snakeArray[0].x;
    var ny = snakeArray[0].y;

    if (direction1 == 'left') {
      nx-=1;
    }
    else if (direction1 == 'up') {
      ny-=1;
    }
    else if (direction1 == 'right') {
      nx+=1;
    }
    else if (direction1 == 'down') {
      ny+=1;
    }

    var tail = snakeArray.pop(); //pops out last cell
    tail.x = nx;
    tail.y = ny;
    snakeArray.unshift(tail); //puts cell back in the front
  }
  paint();
  function draw(){
    clear();
    //draw player 1
    // ctx.fillStyle = player1.color;
    // rect(player1.x, player1.y, 10,10);






    //player 1 movement
    if (direction1 == 'left') {
      player1.x -= speed;
      nx -= speed;
    }
    else if (direction1 == 'up') {
      player1.y -= speed;
      ny -= speed;
    }
    else if (direction1 == 'right') {
      player1.x += speed;
      nx += speed;
    }
    else if (direction1 == 'down') {
      player1.y += speed;
      ny += speed;
    }



    //draw player 2
    if(twoPlayer == true){
      ctx.fillStyle = player2.color;
      rect(player2.x, player2.y, 10,10);
    }


    //game over if border is touched
    // if (player1.x > w - 10 || player1.x < 1 || player1.y > h - 10 || player1.y < 1){
    //   console.log("DEAD");
    //   clearInterval(update); //stops animation
    //   alert('BLUE WINS!');
    // }
    if(twoPlayer ==true){
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

    //draw food
    ctx.fillStyle = "rgb(255, 255, 102)";
    rect(food.x, food.y, 10, 10);

    //clear food if touching player
    if(player1.x <= food.x + 10 && player1.x >= food.x - 10&&
       player1.y <= food.y + 10 && player1.y >= food.y - 10){
      createFood();
      p1score += 1;
      document.getElementById("scorePlayer1").innerHTML = p1score;
      console.log('touch');

    }

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
  //paints the canvas lightblue
  //called at every update frame
  function clear(){
    ctx.clearRect(0,0, w, h);
  }

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

  game_loop = setInterval(paint, 60);
}) //end of iffe
