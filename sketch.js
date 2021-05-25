var PLAY = 1;
var END = 0;
var gameState = 1;
var background1,backgroundImg;
var gun,gunImg;
var bullet,bulletImg;
var zombie,zombieImg,girl,girlImg;
var score,gameover,gameoverImg;
var wall;

function preload(){
backgroundImg = loadImage("background0.png"); 
gunImg = loadAnimation("gun 1.png")
bulletImg = loadImage("bullet1.png"); 
zombieImg = loadImage("zombie1.png");
girlImg = loadImage("girl1.png"); 
gameoverImg = loadImage("gameOver.png")
}

function setup() {
background1 = createSprite(0,0,400,400);
background1.addImage("background",backgroundImg);
background1.scale = 2.5;
  
gun = createSprite(50,200,10,10);
gun.addAnimation("gun",gunImg); 
gun.scale = 0.1;
  
gameover = createSprite(220,200,10,10);
gameover.addImage(gameoverImg);
  
wall = createSprite(5,200,10,500)
wall.visible = false;
  
bulletGroup = new Group();
zombieGroup = new Group();
girlGroup = new Group();
 
score = 0;
}
function draw() {
createCanvas(450,450)
background("grey");

if(gameState===PLAY){
  
  gameover.visible=false;
  
  background1.velocityX = -3 
if (background1.x < 0){
    background1.x = background1.width/2;
}
  gun.y = World.mouseY
  
if (keyDown("space")) {
    createBullet();
  }
  
  if(bulletGroup.isTouching(zombieGroup)){
    zombieGroup.destroyEach();
    bulletGroup.destroyEach();
    score = score+1;
  }
  
  if(bulletGroup.isTouching(girlGroup)){
    girlGroup.destroyEach();
    bulletGroup.destroyEach();
    gameState = END;
  }
  
  if(wall.isTouching(zombieGroup)){
    gameState = END;
  }
  
spawnGirl();
spawnZombie();
  }
  
 if(gameState===END){
   gameover.visible = true;
   background1.velocityX = 0;
   bulletGroup.destroyEach();
   girlGroup.destroyEach();
   zombieGroup.destroyEach();
   gun.destroy()
 } 
  
drawSprites();
 textSize(20);
  text("Score:"+ score ,360,30); 
}
function createBullet() {
  bullet= createSprite(0, 100, 10, 10);
  bullet.addImage(bulletImg);
  bullet.x = 120;
  bullet.y=gun.y;
  bullet.velocityX = 4;
  bullet.lifetime = 100;
  bullet.scale = 0.06;    
  bullet.debug = false;
  bulletGroup.add(bullet);
}

function spawnZombie(){
if(frameCount % 100===0){
 zombie = createSprite(500,200,10,10);
 zombie.addImage(zombieImg);
 zombie.y = Math.round(random(50,350))
 zombie.velocityX = -(4+(score/3));
 zombie.scale = 0.2;
 zombie.setCollider("circle",0,0,200);
 zombie.debug = false;
 zombieGroup.add(zombie);
 } 
}
function spawnGirl(){
 if(frameCount % 120===0){
 girl = createSprite(500,200,10,10);
 girl.addImage(girlImg);
 girl.y = Math.round(random(40,300))
 girl.velocityX = -(3+(score/5));
 girl.scale = 0.2;
 girl.setCollider("circle",0,0,200);
 girl.debug = false;
 
 girlGroup.add(girl); 
  
 } 
}




