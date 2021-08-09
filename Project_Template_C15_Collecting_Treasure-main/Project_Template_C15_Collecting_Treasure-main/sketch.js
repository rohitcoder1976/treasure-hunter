var path,boy,cash,diamonds,jwellery,sword;
var pathImg,boyImg,cashImg,diamondsImg,jwelleryImg,swordImg;
var treasureCollection = 0;
var cashG,diamondsG,jwelleryG,swordGroup;
var gameOver;
var endImg;

//Game States
var PLAY=1;
var END=0;
var gameState=1;

function preload(){
  pathImg = loadImage("Road.png");
  boyImg = loadAnimation("Runner-1.png","Runner-2.png");
  cashImg = loadImage("cash.png");
  diamondsImg = loadImage("diamonds.png");
  jwelleryImg = loadImage("jwell.png");
  swordImg = loadImage("sword.png");
  endImg =loadImage("gameOver.png");
}

function setup(){
  
  createCanvas(400,600);
  // Moving background
  path=createSprite(200,200);
  path.addImage(pathImg);
  path.velocityY = 4;


  //creating boy running
  boy = createSprite(70,530,20,20);
  boy.addAnimation("SahilRunning",boyImg);
 
  boy.scale=0.04;
  boy.setCollider("circle",0,0,400);
  //boy.debug=true;

  //Creating game over image for end state
  gameOver=createSprite(200,300,10,10);
  gameOver.addImage(endImg);
  gameOver.scale=0.7;
  gameOver.visible=false;
  
  cashG=new Group();
  diamondsG=new Group();
  jwelleryG=new Group();
  swordGroup=new Group();

  
  

}

function draw() {

  if(gameState===PLAY){
  background(0);
  boy.x = World.mouseX;

  
  edges= createEdgeSprites();
  boy.collide(edges);
  
  //code to reset the background
  if(path.y > 400 ){
    path.y = height/2;
  }
  
    createCash();
    createDiamonds();
    createJwellery();
    createSword();

    if (cashG.isTouching(boy)){
      cashG.destroyEach();
      treasureCollection=treasureCollection+50;
    }
    else if (diamondsG.isTouching(boy)){
      diamondsG.destroyEach();
      treasureCollection=treasureCollection+100;
    }
    else if (jwelleryG.isTouching(boy)){
      jwelleryG.destroyEach();
      treasureCollection=treasureCollection+150;
    }
    else if (swordGroup.isTouching(boy)){
      gameState=END;
    }
  }


  if (gameState===END){
    
    //Stopping the objects from moving
    cashG.setVelocityEach(0,0);
    jwelleryG.setVelocityEach(0,0);
    diamondsG.setVelocityEach(0,0);
    swordGroup.setVelocityEach(0,0);
    path.velocityY=0;

    //Making objects immortal
    cashG.setLifetimeEach(-1);
    jwelleryG.setLifetimeEach(-1);
    diamondsG.setLifetimeEach(-1);
    swordGroup.setLifetimeEach(-1);

    boy.destroy();
    gameOver.visible=true;

    
    

  }


  
  

  drawSprites();

  //Display text
  textSize(20);
  fill(255);
  text("Treasure: "+ treasureCollection,250,30)

}

function createCash() {
  if (World.frameCount % 200 == 0) {
  var cash = createSprite(Math.round(random(50, 350),40, 10, 10));
  cash.addImage(cashImg);
  cash.scale=0.12;
  cash.velocityY = 3;
  cash.lifetime = 200;
  cashG.add(cash);
  }
}

function createDiamonds() {
  if (World.frameCount % 310 == 0) {
  var diamonds = createSprite(Math.round(random(50, 350),40, 10, 10));
  diamonds.addImage(diamondsImg);
  diamonds.scale=0.03;
  diamonds.velocityY = 3;
  diamonds.lifetime = 200;
  diamondsG.add(diamonds);
}
}

function createJwellery() {
  if (World.frameCount % 460 == 0) {
  var jwellery = createSprite(Math.round(random(50, 350),40, 10, 10));
  jwellery.addImage(jwelleryImg);
  jwellery.scale=0.13;
  jwellery.velocityY = 3;
  jwellery.lifetime = 200;
  jwelleryG.add(jwellery);
  }
}

function createSword(){
  if (World.frameCount % 530 == 0) {
  var sword = createSprite(Math.round(random(50, 350),40, 10, 10));
  sword.addImage(swordImg);
  sword.scale=0.1;
  sword.velocityY = 3;
  sword.lifetime = 220;
  swordGroup.add(sword);
  }
}