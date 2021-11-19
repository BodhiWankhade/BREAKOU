var ball,paddle;
var score = 0;
var gamestate = "serve";
var colors= ["red","green","blue","yellow","orange","purple","cyan"];
var a=0;
var bricks;

function setup(){
  var canvas = createCanvas(1200,600);
ball = createSprite(200,200,10,10);
ball.shapeColor="white";
//ball.setAnimation("golfball_1");


paddle = createSprite(200, 450, 120, 10);
paddle.shapeColor = "blue";

edges = createEdgeSprites();
 bricks = createGroup();

/*createBrickRow(65, "red");
createBrickRow(65+29, "orange");
createBrickRow(65+29+29, "green");
createBrickRow(65+29+29+29, "yellow");
*/
for(var i=65;i<=210;i=i+29){
  
  for(var c=0; c<20; c++)
  {
    var brick = createSprite(65+54*c,i,50, 25);
    brick.shapeColor = colors[a];
    bricks.add(brick);
  }
  a++;
}

}



function draw() {
  background("black");
  
  textSize(20);

  
  
  if(gamestate == "serve"){
    text("Click to serve the ball.", 120,450);
    mousePressed();
  }

  
  
  if(gamestate =='play'){
  text("Score: "+score,1000,25);
  
  paddle.x = World.mouseX;
  
  if(paddle.x < 10)
  {
    paddle.x = 60;
  }
    
  if(paddle.x > 1200)
  {
    paddle.x = 1200;
  }
  
  //rotation = rotation + 5;
  
  ball.bounceOff(edges[0]);
  ball.bounceOff(edges[1]);
  ball.bounceOff(edges[2]);
  ball.bounceOff(paddle);
  ball.bounceOff(bricks, brickHit);
  }
  
  if(!bricks[0])
  {
    //console.log("Won");
    ball.velocityX = 0;
    ball.velocityY = 0;
    text("Well Done!!",150,200);
    gamestate="end";
  }

  if(gamestate =="end") {
    text("Game Over", 150, 250);
    ball.remove;
  }
  drawSprites();
}


function mousePressed()
{
  
  if(gamestate == "serve"){
    gamestate = "play";
    console.log(gamestate);
    ball.velocityY = -7;
    ball.velocityX = -7;
  }
  
}

function brickHit(ball, brick) {
 //playSound("sound://category_hits/puzzle_game_button_04.mp3");
 brick.remove();
 score = score+5;
  
}

