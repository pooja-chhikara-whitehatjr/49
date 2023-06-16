class Player {
    constructor(x, y, width, height) {
      var options = {
        isStatic: true
      };
  
      this.body = Bodies.rectangle(x, y, width, height, options);
  
      this.width = width;
      this.height = height;
      this.collapse = false;
  
      this.image = loadImage("./images/player2.png");
      this.life1="green"
      this.life2="green" 
      this.life3="green" 
      this.life4="green" 
      this.life5="green"
  
      World.add(world, this.body);
  
      Matter.Body.setAngle(this.body, PI / 2); // 90 degree
    }
    life(){
      push();
      textSize(20);
      fill("white");
      text("Player", 280, 40);

    fill(this.life1);
    rect(180, 50, 70, 30);
    fill(this.life2);
    rect(250, 50, 70, 30);
    fill(this.life3);
    rect(320, 50, 70, 30);
    fill(this.life3);
    rect(390, 50, 70, 30);
    fill(this.life3);
    rect(460, 50, 70, 30);
      pop();
    }

    reduceLife(playerLife){
      if(playerLife==4){
        this.life1="red"
        
      }
      if(playerLife==3){
        this.life2="red"
        
      }
      if(playerLife==2){
        this.life3="red"
        
      }
      if(playerLife==1){
        this.life4="red"
        
      }
      if(playerLife==0){
        this.life5="red"
        
      }
      
    }





    
    display() {
        var pos = this.body.position;
    var angle = this.body.angle;
    push();
    translate(pos.x, pos.y);
    rotate(angle);
    imageMode(CENTER);
    image(this.image, 0, 0, this.width, this.height);
    pop();
    }
  }