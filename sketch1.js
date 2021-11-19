var ball,paddle;
var score = 0;
var gamestate = "serve";
var colors= ["red","green","blue","yellow","orange"];
var a=0;
function setup(){
  var canvas = createCanvas(1200,700);
ball = createSprite(200,200,10,10);
//ball.setAnimation("golfball_1");
ball.scale = 0.05;

paddle = createSprite(200, 350, 120, 10);
paddle.shapeColor = "blue";

edges = createEdgeSprites();

var bricks = createGroup();

/*createBrickRow(65, "red");
createBrickRow(65+29, "orange");
createBrickRow(65+29+29, "green");
createBrickRow(65+29+29+29, "yellow");
*/
for(var i=65;i<=152;i=i+29){
  a++;
  for(var c=0; c<6; c++)
  {
    var brick = createSprite(65+54*c,i,50, 25);
    brick.shapeColor = colors[a];
    bricks.add(brick);
  }
}
}

/*function createBrickRow(y, color) {
  console.log("creating bricks");
  
}*/



function draw() {
  background("black");
  
  textSize(20);
  
  if(gamestate == "serve"){
    text("Click to serve the ball.", 120,250)
  }
  
  
  text("Score: "+score,40,25);
  
  paddle.x = World.mouseX;
  
  if(paddle.x < 60)
  {
    paddle.x = 60;
  }
    
  if(paddle.x > 340)
  {
    paddle.x = 340;
  }
  drawSprites();
  //rotation = rotation + 5;
  ball.bounceOff(edges[0]);
  ball.bounceOff(edges[1]);
  ball.bounceOff(edges[2]);
  ball.bounceOff(paddle);
  ball.bounceOff(bricks, brickHit);
  if(ball.bounceOff(paddle))
  {
    //playSound("sound://category_tap/puzzle_game_organic_wood_block_tone_tap_1.mp3");
  }
  if(!bricks[0])
  {
    //console.log("Won");
    ball.velocityX = 0;
    ball.velocityY = 0;
    text("Well Done!!",150,200);
  }
}

function mousePressed()
{
  if(gamestate == "serve"){
    gamestate = "play";
    ball.velocityY = -7;
    ball.velocityX = -7;
  }
  
}

function brickHit(ball, brick) {
 //playSound("sound://category_hits/puzzle_game_button_04.mp3");
 brick.remove();
 score = score+5;
  
}

