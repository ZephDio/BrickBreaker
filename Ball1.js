'use strict';

class Ball {
    constructor(isGoing,x,y,alpha,speed){
        this.isGoing = isGoing;
        this.color = "black";
        this.x = x;
        this.y = y;
        this.radius = 5;
        this.alpha = alpha ;
        this.speed = speed;
        this.redBuff;
    }
    
    next(){
        this.x += this.speed * Math.cos(this.alpha);
        this.y += this.speed * Math.sin(this.alpha);
    }
    
    bounceX(){
 	     this.alpha = (Math.PI/2) - (this.alpha - (Math.PI/2));
 	     if(this.alpha<0){
 	         this.alpha += 2*Math.PI
 	     }
    }
    
    bounceY(){
         this.alpha = Math.PI - (this.alpha - Math.PI);
         if(this.alpha<0){
 	         this.alpha += 2*Math.PI
 	     }
    }
    
    bouncePlate(indicator){
        this.alpha = (Math.PI*(11/10)) + (indicator*(8/10)*Math.PI)
    }
    
    expel(thing){
      let DiffSmallX = Math.abs(this.x-thing.x)
      let DiffSmallY = Math.abs(this.y-thing.y)
      let DiffBigX   = Math.abs(this.x-(thing.x+thing.width))
      let DiffBigY   = Math.abs(this.y-(thing.y+thing.height))
      let min = Math.min(DiffSmallX,DiffSmallY,DiffBigX,DiffBigY)
      
      switch(min){
          case DiffSmallX : this.x = thing.x- this.radius
                            break;
          case DiffSmallY : this.y = thing.y- this.radius
                            break;
          case DiffBigX   : this.x = thing.x + thing.width + this.radius
                            break;
          case DiffBigY   : this.y = thing.y + thing.height + this.radius
      }
    }
    
    
    isOutOfGame(gameWidth){
        if(this.x > gameWidth || this.x < 0 || this.y < 0){
            return true;
        }return false;
    }
    
    expelInGame(gameWidth,ballSpeed){
        if(this.x > gameWidth || this.x < 0){
 	            this.bounceX();
 	            this.speed = ballSpeed;
 	        }
 	        
 	    if(this.y < 0){
 	            this.bounceY();
     	        this.speed = ballSpeed
 	        }
      
 	        if(this.x<0){
                this.x = this.radius;
            }else if(this.x>gameWidth){
                this.x = gameWidth - this.radius;
            }else if (this.y<0){
                this.y = this.radius;
            }
    }
}