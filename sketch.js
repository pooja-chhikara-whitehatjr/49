const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
//var levels = level1;
var score
var bullets=50
var engine, world;
var canvas;
var bullet
var oceanImg,ocean;
var hippo, hippoImg;
var damageImg, hpImg, damage, hp;
var ballImg,ball;
var gun, gunImg;
var player, playerImg;
var enemy, enemyImg;
var shooter_shooting;
var obstacle,obstacleImage;
var bullets=[]
var ebullets=[]
var gun,gunImg
var enemyLife=5;
var playerLife=5;

var enemys = [];
function preload() {
 
  backgroundImg = loadImage("./bg.png");
  hippoImg = loadAnimation("./normalHippo.png","./hippoHit.png");
  damageImg = loadImage("./alsoHealthBar.png");
  hpImg = loadImage("./healthBar.png");
  ballImg = loadImage("./tennisBall.png");
  enemyImg = loadImage("./enemyCharacter.png");
  playerImg = loadImage("./player2.png");
  shooter_shooting = loadImage("./shooter_3.png");
  obstacleImage = loadImage("./obstacle.png");

}

function setup() {
  canvas = createCanvas(2000, 600);
  engine = Engine.create();
  world = engine.world;
  angleMode(DEGREES);
  angle = 15;
  engine = Engine.create();
  world = engine.world;

  hippo = createSprite(4000,200,10,10);
  hippo.addAnimation("hippo",hippoImg);

  // enemy = createSprite(1600,300,10,10);
  // enemy.addImage("char3",enemyImg);
  // enemy.scale= 0.4

  obstacle = createSprite(1000,350,10,10);
  obstacle.addImage("treasure",obstacleImage);
  obstacle.scale=0.8


  player = new Player(285,height-300,600,400)
  enemy = new Enemy(
    width - 350, 180,
    120,
    120
  );


  gun = new Gun(370, 330, 130, 100, angle);
 


  handleenemy()
  
  /*//add these lines when the charcter is hit
  damage = createSprite(150,300,10,10);
  damage.addImage("lossOfHealth",damageImg);
  hp = createSprite(1000,200,10,10);
  hp.addImage("health",hpImg);*/


 
}

function draw() {
  background(backgroundImg);
  
  Engine.update(engine);
  
  for(var i=0;i<bullets.length;i++){
    showBullets(bullets[i])
  }
  for(var i=0;i<ebullets.length;i++){
    showBullets(ebullets[i])
  }


  textSize (34)
  fill ("red")
  text("score:",40,40);
  text(score,210,200)


  
  
  handleEnemyCollision()
  handlePlayerCollision()
  gun.display()
  enemy.life()
  enemy.display()
  player.display()
  player.life()
  drawSprites();
}



function keyPressed(){
  if(keyCode===32){
    //player.addImage(shooter_shooting);
    bullet = new Bullet(gun.x+5, gun.y-10);
    bullets.push(bullet)
    
  }
}
function showBullets(bullet)
{
  if(bullet){
    bullet.display()
  }
}

function keyReleased(){
  if(keyCode===32){
    bullets[bullets.length-1].shoot()
  }
}
function handleenemy() {
  if (!enemy.collapse && !player.collapse) {
    setTimeout(() => {
      var pos = enemy.body.position;
      var angle = enemy.body.angle;
      var moves = ["UP", "DOWN"];
      var move = random(moves);
      var angleValue;

      if (move === "UP" && enemy.body.angle < 1.67) {
        angleValue = 0.1;
      }else{
          angleValue = -0.1;
      }
      if(move === "DOWN" && enemy.body.angle > 1.47) {
        angleValue = -0.1;
      }else{
          angleValue = 0.1;
      }
      
      angle += angleValue;

      var ebullet= new EnemyBullet(pos.x, pos.y, 100, 10, angle);

      Matter.Body.setAngle(enemy.body, angle);
      Matter.Body.setAngle(enemy.body, angle);

      ebullets.push(ebullet);
      setTimeout(() => {
        ebullets[ebullets.length - 1].shoot(angle);
      }, 100);

      handleenemy();
    }, 2000);
  }
}

function handleEnemyCollision(){
  for(var i=0; i<bullets.length;i++){
    var enemyCollision=Matter.SAT.collides(bullets[i].body,enemy.body)
    
    if(enemyCollision.collided){
      enemyLife-=1
      enemy.reduceLife(enemyLife)
      if(enemyLife<=0){
        enemy.collapse=true
        Matter.Body.setStatic(enemy.body,false)
        Matter.Body.setPosition(enemy.body,{
          x:width-100,
          y:enemy.body.position.y
          
        })
      }
    }
  }

}
function handlePlayerCollision(){
  for(var i=0; i<ebullets.length;i++){
    var playerCollision=Matter.SAT.collides(ebullets[i].body,player.body)
    
    if(playerCollision.collided){
      playerLife-=1
      player.reduceLife(playerLife)
      if(playerLife<=0){
        player.collapse=true
        Matter.Body.setStatic(player.body,false)
        Matter.Body.setPosition(player.body,{
          x:width-100,
          y:player.body.position.y
          
        })
      }
    }
  }

}
