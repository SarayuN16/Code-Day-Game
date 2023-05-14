var selenarun, selenastand;
var justin;
var haileymad1, haileymad2;
var obstacles;
var heart;
var background;
var gameState = "end";
var heartcount = 0;

function preload(){
  selenarun = loadAnimation("selenastand.png","selenarun.png");
  justin = loadImage("loveu.png");
  selenastand = loadImage("selenastand.png");
  haileymad1 = loadImage("hailey mad1.png");
  haileymad2 = loadImage("haileymad2.png");
  heart = loadImage("heart.png");
  backgroundImage = loadImage("background.jpg");
}


function setup() {
  createCanvas(800, 400);

  selenarun = createSprite(400,100,400,20);
  var img = new Image();
  img.src = "  selena.scale=1.5 
  selena.x = width /2;

  selenastand = createSprite(50,300,20,10);
  //selenastand.addAnimation("standing", selenastand);
  //selenarun.addAnimation("running", selenarun);
  selena.scale = 0.6;

    
  nextbutton= createSprite(250,250,100,20);
  nextbutton.addImage(btn);
  nextbutton.scale=0.5;
  nextbutton.visible=false;

  gameOver = createSprite(400,100);
  gameOver.addImage(gameOverImg);
  
  restart = createSprite(550,140);
  restart.addImage(restartImg);
  
  gameOver.scale = 0.5;
  restart.scale = 0.1;

  gameOver.visible = false;
  restart.visible = false;
  
  
  selenaGroup = new Group();
  obstaclesGroup = new Group();
  
  score = 0;
  life=3;

}

function draw() {
  background(255);
  
  selena.x=camera.position.x-270;
   
  if (gameState===PLAY){

    background.velocityX=-3

    if(background.x<0)
    {
       background.x=500
    }
   console.log(selena.y)
    if(keyDown("space")&& selena.y>250) {
      jumpSound.play();
      selena.velocityY = -16;
    }
  
    selena.velocityY = selena.velocityY + 0.8
    spawnObstacles();

    selena.collide(invisibleGround);
    
    if(obstaclesGroup.isTouching(selena)){
      collidedSound.play();
      life-=1;
      obstaclesGroup.destroyEach()
      if (life===0){
        gameState=END;}
    }
    if(justinGroup.isTouching(selena)){
      score = score + 1;
      justinGroup.destroyEach();
    }

    
  }
  else if (gameState === END) {
    gameOver.x=camera.position.x;
    restart.x=camera.position.x;
    gameOver.visible = true;
    restart.visible = true;
    selena.velocityY = 0;
    background.velocityX = 0;
    obstaclesGroup.setVelocityXEach(0);
    justinGroup.setVelocityXEach(0);

    selena.changeAnimation("collided",selena_collided);
    
    obstaclesGroup.setLifetimeEach(-1);
    justinGroup.setLifetimeEach(-1);
    
    if(mousePressedOver(restart)) {
        reset();
    }
  }

  else if (gameState === WIN) {
    background.velocityX = 0;
    selena.velocityY = 0;
    obstaclesGroup.setVelocityXEach(0);
    justinGroup.setVelocityXEach(0);

  

    obstaclesGroup.setLifetimeEach(-1);
    justinGroup.setLifetimeEach(-1);
   
    //btn.position(70,250);
    nextbutton.visible=true;  
    if (mousePressedOver(nextbutton)){
      nextLevel()
    }

  }
  
  
  drawSprites();

  textSize(25);
  strokeWeight(10);
  stroke(3);
  fill("white");
  text("Score: "+ score, camera.position.x,50);
  text("Life: "+ life,camera.position.x,25);
  
  if(score >= 2){
    

  }
}

function spawnHailey() {
 
  if (frameCount % 150 === 0) {

    var loveu= createSprite(camera.position.x+500,300,40,10);

    loveu.velocityX = -(6 + 3*score/100)
    //loveu.scale = 0.8;

    var rand = Math.round(random(1,3));
    //switch(+1) {
      //case 1: loveu.addImage(loveu1);
        //      break;
      //case 2: loveu.addImage(loveu2);
        //      break;
      //case 3: loveu.addImage(loveu3);
        //      break;
      //default: break;
    //}
       
    loveu.scale = 0.25;
    loveu.lifetime = 400;
    
    loveu.setCollider("rectangle",0,0,loveu.width/2,loveu.height/2)
    justinGroup.add(justin);
    
  }
  
}

function spawnObstacles() {
  if(frameCount % 120 === 0) {

    var obstacle = createSprite(camera.position.x+400,300,40,40);
    obstacle.setCollider("rectangle",0,0,200,200);
    //obstacle.addImage(obstacle1);
    obstacle.velocityX = -(6 + 3*score/100);
    obstacle.scale = 0.5;      

    obstacle.lifetime = 400;
    obstaclesGroup.add(obstacle);
    
  }
}

function reset(){
  gameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;
  selena.visible = true;
  selena.changeAnimation("running",
               kangaroo_running);
  obstaclesGroup.destroyEach();
  justinGroup.destroyEach();
  score = 0;
}

function nextLevel(){
  gameState=PLAY;
  nextbutton.visible=false;
  selena.visible = true;
  selena.changeAnimation("running",
               kangaroo_running);
  obstaclesGroup.destroyEach(); 
  justinGroup.destroyEach();
  score = score+10;
}

