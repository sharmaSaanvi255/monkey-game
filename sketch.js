var PLAY=1;
var END=0;
var gameState=PLAY;
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  monkey=createSprite(80,315,20,20)
  monkey.addAnimation("moving",monkey_running);
  monkey.scale=0.1;
  
  ground=createSprite(400,350,900,20)
  ground.velocityX=-4;
  ground.x=ground.width/2;
  console.log(ground.x)
  
  bananaGroup=createGroup();
  obstacleGroup=createGroup();
}
score=0;

function draw() {
  background(225);
  
  if (gameState===PLAY) {
  
  if (keyDown ("space") && monkey.y>210) {
    monkey.velocityY=-12;
  }
  monkey.velocityY=monkey.velocityY+0.5;
  
  if(ground.x<0) {
    ground.x=ground.width/2;
  } 
  
  if (monkey.isTouching(bananaGroup)) {
    bananaGroup.destroyEach();
  }
  
  if (monkey.isTouching(obstacleGroup)) {
    gameState=END;
  }
  
  stroke("black")
  score=Math.ceil(frameCount/frameRate())
  text ("SURVIVAL TIME : "+score,280,50)
  
  if (frameCount%80==0) {
    bananasForMonkey();
  }
  
  if (frameCount%300==0) {
    obstacles();
  }
  }
  else if (gameState===END) {
    monkey.velocityX=0;
    bananaGroup.setVelocityXEach(0);
    obstacleGroup.setVelocityXEach(0);
    ground.velocityX=0;
    
    bananaGroup.setLifetimeEach(-1);
    obstacleGroup.setLifetimeEach(-1);
    if (monkey.isTouching(obstacleGroup)) {
    textSize(20);
    text("Game Over",150,150)
    }
  }
  
  monkey.collide(ground);
  drawSprites();
  
}

function bananasForMonkey () {
  var banana=createSprite(370,Math.round(random(120,200)),10,10);
  banana.addImage(bananaImage)
  banana.velocityX=-3;
  banana.lifetime=370/3;
  banana.scale=0.1;
  bananaGroup.add(banana);
}

function obstacles() {
  var gameObstacle=createSprite(370,320,10,10);
  gameObstacle.addImage(obstacleImage);
  gameObstacle.velocityX=-5;
  gameObstacle.lifetime=370/5;
  gameObstacle.scale=0.1;
  obstacleGroup.add(gameObstacle);
}




