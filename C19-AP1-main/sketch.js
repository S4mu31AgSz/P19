var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"
var check = 0;
var colliderGroup;
var collider;
var deathbox;
var deathGroup;
var doorGroup;
var check2 = 1;
var score = 0;
var highscore = 0;

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
  jumpImg = loadImage("ghost-jumping.png");
}

function setup() {
  createCanvas(600, 600);
  tower = createSprite(width/2,0);
  tower.addImage("tower",towerImg);
  
  ghost = createSprite(width/2,height/2,50,50);
  ghost.scale = 0.3;
  ghost.addImage("ghost",ghostImg);
  tower.depth = ghost.depth-3;

  colliderGroup = new Group();
  deathGroup = new Group();
  doorGroup = new Group();
}

function draw() {

  if(highscore<score){
    highscore = score;
  } 
console.log(highscore);
  background(200);

  if(gameState === "play"){
    if(frameCount%10 === 0){
      score = score + 1;
    }
    check2 = 1;
  ghost.collide(colliderGroup);
  tower.velocityY = 2;
  ghost.velocityY = ghost.velocityY + 0.5 
  if(keyDown("Space")){
    if(check===0){
      ghost.velocityY = -13;
      ghost.addImage("ghost",jumpImg);
    }
    check = 1;
  } else {
    check = 0;
    ghost.addImage("ghost",ghostImg);
  }
  if(keyDown("left_arrow")){
    ghost.x = ghost.x - 10;
  }
  if(keyDown("right_arrow")){
    ghost.x = ghost.x + 10;
  }
  
  if(ghost.isTouching(deathGroup)){
    gameState = "end";
  }

  }else if(gameState === "end"){
    ghost.velocityY = 0;

    if(check2 === 1){
      check2 = 0;
    spookySound.play();
    } 
    
    if(keyDown("space")){
      gameState = "play";
      ghost.x = width/2;
      ghost.y = height/2;
      score = 0;
      doorGroup.setLifetimeEach(0);
    }

  }

  if(tower.y > height){
      tower.y = 0;
    }
    createDoors();
    drawSprites();
    fill(0,255,0);
    textAlign(CENTER)
    textSize(20);
    text("pontos: "+ score, width/2,height-35);
    text("recorde: "+ highscore, width/2,height-15);
}


function createDoors(){
  if(frameCount%160 === 0){

    door = createSprite(random((width/2)+(tower.width/4),(width/2)-(tower.width/4)),-50);
    door.velocityY = tower.velocityY;
    door.addImage("door",doorImg);
    door.lifetime = 1000;
    door.depth = ghost.depth-2;
    doorGroup.add(door);

    climber = createSprite(door.x,door.y+60);
    climber.velocityY = door.velocityY;
    climber.addImage("climber",climberImg);
    climber.depth = ghost.depth-1;
    climber.lifetime = 1000;

    doorGroup.add(climber);

    collider = createSprite(climber.x,climber.y-5,100,10);
    collider.velocityY = climber.velocityY;
    collider.lifetime = 1000;
    collider.visible = false;
    colliderGroup.add(collider);

    deathbox = createSprite(climber.x,climber.y+5,100,10);
    deathbox.velocityY = climber.velocityY;
    deathbox.lifetime = 1000;
    deathGroup.add(deathbox);
    deathbox.visible = false;

  }
}