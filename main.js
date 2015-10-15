$(function(){
  var canvas = document.getElementById("canvas");
  var ctx = canvas.getContext("2d");
  var w = canvas.width;
  var h = canvas.height;
  var FPS = 60; //snakeArray moves every update, not speed
  var speed = 1; //if speed is more than one, spaces are created between snakeArray
  var score;
  var p1score;
  var p2score;
  var twoPlayer = false;
  var direction1;//default direction
  var direction2;
  var update;
  var snakeArray; //array of cells that make the snake
  var snakeArray2;
  var food;

  function menu(){
    var textPos = 0;
    var animText = setInterval(textAnim, 60);
    document.getElementById("score").style.visibility = "hidden";
    document.getElementById("p1score").style.visibility = "hidden";
    document.getElementById("p2score").style.visibility = "hidden";
      //sexy SNAKE animation
    function textAnim(){
      clear();
      textPos += 10;
      if(textPos > 160){
        clearInterval(animText);
      }
      ctx.font = "800 30px Arial";
      ctx.fillStyle = "tomato";
      ctx.fillText("SNAKE",250,textPos);

      //player 1 temp box
      ctx.fillStyle = "lightblue";
      var single =  new rect(200, 180, 100,25);

      ctx.font = "300 15px Arial";
      ctx.fillStyle = "tomato";
      ctx.fillText("Single Player", 205, 200);

      //player 2 temp box
      ctx.fillStyle = "lightblue";
      var double =  new rect(310, 180, 100,25);

      ctx.font = "300 15px Arial";
      ctx.fillStyle = "#3366FF";
      ctx.fillText("Two Player", 315, 200);
    }

    //initiates single or two player onClick
    ctx.font = "800 30px Arial";
    ctx.fillStyle = "tomato";
    ctx.fillText("SNAKE",250,textPos);

    canvas.addEventListener('click', function(evt){
      if(evt.x > 250 && evt.x < 330 && evt.y > 231 && evt.y < 250 ){
        menu();
        clearInterval(animText);
      }
      else if(evt.x > 190 && evt.x < 300 && evt.y > 180 && evt.y < 215 ||
        evt.x > 250 && evt.x < 330 && evt.y > 210 && evt.y < 230 ){
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
  }

  menu();

  //runs if single player is selected in start
  function singlePlayerinit() {
    clear();
    clearInterval(update);
    createSnake1();
    createFood();
    direction1 = 'up';
    score = 0;
    document.getElementById("score").innerHTML = score;
    document.getElementById("score").style.visibility = "visible";
    document.getElementById("p1score").style.visibility = "hidden";
    document.getElementById("p2score").style.visibility = "hidden";
    update = setInterval(draw, FPS);
  }
  //runs if two player is selected in start
  function twoPlayerinit() {
    clear();
    clearInterval(update);
    createSnake1();
    createSnake2();
    createFood();
    direction1 = 'up';
    direction2 = 'down';
    p1score = 0;
    p2score = 0;
    document.getElementById("score").style.visibility = "hidden";
    document.getElementById("p1score").style.visibility = "visible";
    document.getElementById("p2score").style.visibility = "visible";
    update = setInterval(draw, FPS);
  }
  function createSnake1(){
    var length = 5; //initial length of snake
    snakeArray = []; //start with empty array
    for (var i=0; i <= length; i++){
      //creates a vertical snake moving up
      snakeArray.push({x:50, y:i+25});
    }
  }

  function createSnake2(){
    var length = 5; //initial length of snake
    snakeArray2 = []; //start with empty array
    for (var i=length; i >= 0 ; i--){
      //creates a vertical snake moving down
      snakeArray2.push({x:10, y:i+10});
    }
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
  function singlePlayerGameOver(){
    ctx.font = "800 30px Arial";
    ctx.fillStyle = "tomato";
    ctx.fillText("GAME OVER",210,200);

    ctx.font = "300 15px Arial";
    ctx.fillStyle = "tomato";
    ctx.fillText("Play Again",260,220);

    ctx.font = "300 15px Arial";
    ctx.fillStyle = "tomato";
    ctx.fillText("Main Menu",260,240);
  }
  function draw(){
    clear();

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
    if (nx >= w/10 || nx < 0 || ny >= h/10 || ny < 0 ||
      checkCollision(nx, ny, snakeArray) ||  //checks collision with itself
      snakeArray == "undefined"){
      //checkCollision(nx, ny, snakeArray2)){ //checks collision with p2
      singlePlayerGameOver();
      console.log("DEAD");
      clearInterval(update); //stops animation
      if(twoPlayer == true){
        p2score += 1;
        document.getElementById("p2score").innerHTML = p2score;
        //alert('BLUE WINS!');
      }
      else {
        //alert("DEAD");
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
      if(twoPlayer == true){
        snakeArray2.pop();
      }
      createFood();
      score += 1;
      document.getElementById("score").innerHTML = score;
      console.log('touch');
    }
    else {
      //x and y positions are updated every frame, but cells are not
      var tail = snakeArray.pop(); //pops out last cell
      tail.x = nx;
      tail.y = ny;
    }

    snakeArray.unshift(tail); //puts cell back in the front
    //tail becomes new head every frame

    //draw Player 2
    if(twoPlayer == true){
      for (var i=0; i < snakeArray2.length; i++){
        var c = snakeArray2[i];
        ctx.fillStyle = '#3366FF';
        rect(c.x*10, c.y*10, 10, 10);
      }
      var nx2 = snakeArray2[0].x;
      var ny2 = snakeArray2[0].y;

      //player 2 movement
      if (direction2 == 'left') {
        nx2 -= speed;
      }
      if (direction2 == 'up') {
        ny2 -= speed;
      }
      if (direction2 == 'right') {
        nx2 += speed;
      }
      if (direction2 == 'down') {
        ny2 += speed;
      }

      //player2 collision
      if (nx2 >= w/10 || nx2 < 0 || ny2 >= h/10 || ny2 < 0 ||
        checkCollision(nx2, ny2, snakeArray2) || //checks collision with itself
        checkCollision(nx2, ny2, snakeArray) || //checks collision with p1
        snakeArray2 == "undefined"){ //checks if player dissapeared
        console.log("DEAD");
        p1score += 1;
        document.getElementById("p1score").innerHTML = p1score;
        clearInterval(update); //stops animation
        alert("RED WINS!");
      }

      //clear food if touching player
      //also had to divide food position by 10...
      if(nx2 == food.x/10 && ny2 == food.y/10){
        var tail2 = {
          x: nx2,
          y: ny2
        }
        snakeArray.pop();
        createFood();
        console.log('touch');
      }
      else {
        //x and y positions are updated every frame, but cells are not//
        var tail2 = snakeArray2.pop(); //pops out last cell
        tail2.x = nx2;
        tail2.y = ny2;
      }

      //puts cell back in the front
      //tail becomes new head every frame
      snakeArray2.unshift(tail2);
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
  $(document).keydown(function(evt) {
    if (evt.keyCode == 65 && direction2 != 'right'){
      direction2 = 'left';
      console.log("left pressed");
    }
    else if (evt.keyCode == 87 && direction2 != 'down'){
      direction2 = 'up';
    }
    else if (evt.keyCode == 68 && direction2 != 'left'){
      direction2 = 'right';
    }
    else if (evt.keyCode == 83 && direction2 != 'down'){
      direction2 = 'down';
    }
  });
}) //end of iffe
