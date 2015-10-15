$(function(){
  var canvas = document.getElementById("canvas");
  var ctx = canvas.getContext("2d");
  var w = canvas.width;
  var h = canvas.height;
  var FPS = 100; //snakeArray moves every update, not speed
  var speed = 1; //if speed is more than one, spaces are created between snakeArray
  var score = 0;
  var twoPlayer = false;
  var direction1;//default direction
  var direction2 = 'down';
  var update;
  var snakeArray; //array of cells that make the snake
  var snakeArray2;
  var food;
  var textPos = 0;

  function start(){
    var animText = setInterval(textAnim, 60);
      //SNAKE animation
      function textAnim(){
        clear();
        textPos += 10;
        if(textPos > 150){
          clearInterval(animText);
        }
        ctx.font = "800 30px Arial";
        ctx.fillStyle = "tomato";
        ctx.fillText("SNAKE",250,textPos);

        ctx.fillStyle = "tomato";
        var single =  new rect(200, 180, 100,25);

        ctx.fillStyle = "#3366FF";
        var double =  new rect(310, 180, 100,25);
      }


    //var singlePlayer = document.querySelector("#singlePlayer");
    canvas.addEventListener('click', function(evt){
      if(evt.x > 190 && evt.x < 300 && evt.y > 180 && evt.y < 215){
        twoPlayer = false;
        singlePlayerinit();
        clearInterval(animText);
      }
      else if(evt.x > 320 && evt.x < 420 && evt.y > 180 && evt.y < 215){
        twoPlayer = true;
        twoPlayerinit();
        clearInterval(animText);
      }
    });
    // twoPlayer = document.querySelector("#twoPlayer");
    // twoPlayer.addEventListener('click', function(){
    //   twoPlayer = true;
    //   twoPlayerinit();
    //   clearInterval(animText);
    // });
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

  function create_snake2(){
    var length = 5; //initial length of snake
    snakeArray2 = []; //start with empty array
    for (var i=length-1; i >= 0 ; i--){
      //creates a vertical snake moving down
      snakeArray2.push({x:20, y:i+10});
    }
  }
  //runs if single player is selected in start
  function singlePlayerinit() {
    clear();
    create_snake1();
    createFood();
    direction1 = 'up';
    score = 0;
    return update = setInterval(draw, FPS);//updates screen every 10 milliseconds creating illusion of movement
  }
  //runs if two player is selected in start
  function twoPlayerinit() {
    clear();
    createFood();
    direction1 = 'up';
    direction2 = 'up';
    return update = setInterval(draw, FPS);//updates screen every 10 milliseconds creating illusion of movement
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
      x: Math.round((Math.random() * w)/10) * 10, //random x position for food
      y: Math.round((Math.random() * h)/10) * 10,
      color: "#FFFF99"
    };
  }

  function checkCollision(x, y, array){
    for(var i=0; i < array.length; i++){
      if(array[i].x == x && array[i].y == y){
        console.log('collision');
        return true;
      }
    }
    return false;
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

    //game over if border is touched
    //freakin weird.... had to divide width and height by ten...
    if (nx >= w/10 || nx < 0 || ny >= h/10 || ny < 0 || checkCollision(nx, ny, snakeArray)){
      console.log("DEAD");
      clearInterval(update); //stops animation
      if(twoPlayer == true){
        alert('BLUE WINS!');
      }
      else {
        alert("DEAD");
      }
    }

    //draw food
    ctx.fillStyle = "yellow";
    rect(food.x, food.y, 10, 10);

    //clear food if touching player
    //also had to divide food position by 10...
    if(nx == food.x/10 && ny == food.y/10){
      var tail = {
        x: nx,
        y: ny
      }
      createFood();
      score += 1;
      document.getElementById("score").innerHTML = score;
      console.log('touch');
    }
    else {
      //x and y positions are updated every frame, but cells are not//
      var tail = snakeArray.pop(); //pops out last cell
      tail.x = nx;
      tail.y = ny;
    }


    snakeArray.unshift(tail); //puts cell back in the front
    //tail becomes new head every frame

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
    if (evt.keyCode == 37 && direction1 != 'right'){
      direction1 = 'left';
    }
    else if (evt.keyCode == 38 && direction1 != 'down'){
      direction1 = 'up';
    }
    else if (evt.keyCode == 39 && direction1 != 'left'){
      direction1 = 'right';
    }
    else if (evt.keyCode == 40 && direction1 != 'up'){
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
