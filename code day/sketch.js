
//var birdIMG;
var backgroundIMG;
var hailey;
var selena;
var justin;

var gameState="end";
var gs = "a";

var point = 0;

let engine;
let world;

var gameStart = false;


function preload(){
  backgroundIMG = loadImage("background.jpg");
  selenaIMG= loadImage("face.png");
  haileyIMG = loadImage("hailey.png");
  justinIMG = loadImage("justin.png");
}


function setup() {
  createCanvas(1024,768);
  background(backgroundIMG);  
  rectMode(CENTER);
  ellipseMode(RADIUS);
  
  selena=createSprite(50,200, 70, 70);
  selena.addImage(selenaIMG);
  //selena.scale = 0.05;
  

  // obs 1
  hailey1=createSprite(250,200);
  hailey1.addImage(haileyIMG);
  //hailey1.scale = 0.2;
  //hailey1.width = 50;
  //hailey1.height = 50;
  

  hailey2=createSprite(250,500);
  hailey2.addImage(haileyIMG);
  //hailey2.scale=0.2;
  //

  // obs 2
  hailey3=createSprite(500,160);
  hailey3.addImage(haileyIMG);
  //hailey3.scale = 0.2

  hailey4=createSprite(500,680);
  hailey4.addImage(haileyIMG);
  //hailey4.scale=0.2
  // 

  // obs 3
  hailey5=createSprite(700,190);
  hailey5.addImage(haileyIMG);
  //hailey5.scale = 0.2

  hailey6=createSprite(600,400);
  hailey6.addImage(haileyIMG);
  //hailey6.scale=0.2
  // 

  // obs 4
  hailey7=createSprite(900,120,50,50);
  hailey7.addImage(haileyIMG);
  //hailey7.scale = 0.2

  hailey8=createSprite(900,640);
  hailey8.addImage(haileyIMG);
  //hailey8.scale=0.2
  //

  justin = createSprite(950,380)
  justin.addImage(justinIMG);
  //justin.scale=0.2

  ground = createSprite(10,760,2050,20)
  
}

function draw() {
     
    if(keyDown(RIGHT_ARROW)) {
      gameStart = true;
      selena.x += 5;
    }

    if(keyDown("space")) {
      gameStart = true;
      selena.velocityY = -5;
    }

    if(gameStart) {
      //add gravity
      selena.velocityY = selena.velocityY + 0.8
    }
    
    if(selena.collide(justin) && gameStart)
    {
      gameState = "end";
      swal("Good job!", "SELENA X JUSTIN", "success");
      gameStart = false;
    }

    if(selena.collide(hailey1)  && gameStart) {
      console.log("collide hailey1");
      reStart();
    }

    if(selena.collide(hailey2)  && gameStart) {
      console.log("collide hailey2");
      reStart();
    }

    if(selena.collide(hailey3)  && gameStart) {
      console.log("collide hailey3");
      reStart();
    }

    if(selena.collide(hailey4)  && gameStart) {
      console.log("collide hailey4");
      reStart();
    }

    if (selena.collide(ground)  && gameStart) {
      console.log("collide ground");
      reStart();
    }
    
  drawSprites();     

}

function reStart() {
  gameState = "start";
  gameStart = false;
  if(alert('Game over. Selena was not able to get with Justin.')){}
  else    window.location.reload(); 
}

