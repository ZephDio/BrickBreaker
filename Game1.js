'use strict';


class Game {
    
    constructor (width,height){
        this.balls= [];
        this.bricks= [];
        this.buffPods= [];
        this.levels= TableOfLevel;
        this.ballSpeed=4.3;
        this.tickSpeed=1;
        this.actualLevel = -1;
        this.isGameOver = false;
        this.buffManager= new BuffManager();
        this.width = width;
        this.height = height;
        this.plateWidth = (7/50)*width;
        this.plate= new Plate(width/2,height-((1/20)*height),this.plateWidth,(1/20)*height);
    }
    
    
    initializeBalls(){
        this.balls.push(new Ball(false,0,0,Math.PI*(5/3),this.ballSpeed))

    }
    
    initializeBricks(actualLevel){
        console.log(this.levels[actualLevel])
        for(const brick of this.levels[actualLevel]){
 	            let newbrick = new Brick(brick.color,                           // color
 	                                    (brick.x*this.width/10),                // x
 	                                    (brick.y*this.height/12),               // y
 	                                     brick.x,                               // x Grill
 	                                     brick.y,                               // y Grill
 	                                     this.width/10,                         // width
 	                                     this.height/12,                        // height
 	                                     brick.hitToDie)                        // hitToDie
 	            this.bricks.push(newbrick);
 	    }
    }
    
    
    
    updateBuffPods(){
        for(let i=0; i<this.buffPods.length ; i++){
            this.buffPods[i].next();
            if(this.plate.contains(this.buffPods[i].x + (this.buffPods[i].width/2), this.buffPods[i].y + (this.buffPods[i].height/2))){
                switch(this.buffPods[i].effect){
                    case "redBuff" :  this.buffManager.applyRedBuff(10);
                                      break;
                    case "blueBuff" : this.buffManager.applyBlueBuff(12);
                                      break;
                    case "multiBall": let ball = new Ball(true,this.balls[0].x,this.balls[0].y,this.balls[0].alpha+Math.PI,this.balls[0].speed)
                                                 this.balls.push(ball);
                                      break;
                    case "slowBalls": for(const ball of this.balls){
                                            this.ballSpeed -= 0.09;
                                            ball.speed = this.ballSpeed;
                                            if(this.ballSpeed <= 1)this.ballSpeed=1;
                                        }
                }
                
 	            this.buffPods.splice(i,1);
 	            
            }else
            if(this.buffPods[i].y>this.height){
                this.buffPods.splice(i,1);
            }
        }
    }
    
    updateBalls(input){
        if(!this.balls[0].isGoing){
            this.balls[0].x = this.plate.x +(this.plate.width/2);
            this.balls[0].y = this.plate.y - this.balls[0].radius;
        }
        
        
        for(let i = 0 ; i < this.balls.length ; i++){
            const ball = this.balls[i];
            ball.alpha = ball.alpha % (Math.PI*2);
            if(ball.isGoing){
            ball.next();
            }
            for(const brick of this.bricks){
                
                
                
                if(brick.contains(ball)){
                    brick.hit();
                    if(brick.hitToDie === 0){
                        this.generateBuffPod(brick.x+(brick.width/2),brick.y+(brick.height/2));
                    }
                    
                    
                    ball.alpha = ball.alpha % (Math.PI*2)
                    const conditionBouncingLeft = (ball.alpha < Math.PI/2 || ball.alpha > Math.PI*(3/2)) && ball.x<brick.x + brick.width/2;
                    const conditionBouncingRight = (ball.alpha > Math.PI/2 && ball.alpha < Math.PI*(3/2)) && ball.x>brick.x + brick.width/2;
                    const conditionBouncingTop = (ball.alpha < Math.PI) && ball.y<brick.y + brick.height/2;
                    const conditionBouncingBottom = (ball.alpha > Math.PI) && ball.y>brick.y + brick.height/2;
                    
                    
                     if(brick.bouncingOnSide(ball) && !this.buffManager.isRedBuffActive() &&
                     (conditionBouncingLeft || conditionBouncingRight)){
                         ball.bounceX();
                         ball.expel(brick);
                         
                             }
                        
                     if(brick.bouncingOnHorizontalSide(ball) && !this.buffManager.isRedBuffActive() &&
                     (conditionBouncingTop || conditionBouncingBottom)) {
                         ball.bounceY();
                         ball.expel(brick);
                         }
                }
            }
            
            if(this.plate.contains(ball.x,ball.y)){
                    const bounceIndicator = (ball.x-this.plate.x)/this.plate.width;
                    ball.bouncePlate(bounceIndicator);
                    ball.expel(this.plate);
                }
            if(ball.isOutOfGame(this.width)){
                if(i===0)this.ballSpeed += 0.01;
                ball.expelInGame(this.width,this.ballSpeed);
            }
 	        
 	        if(ball.y>this.height){
                this.balls.splice(i,1);
                ball.expelInGame(this.width,this.ballSpeed);
            }
        }
        
    }
    
    isComplete(){
        for(const brick of this.bricks){
            if(brick.hitToDie>0) return false;
        }return true;
    }
    
    updateState(){
        if(this.isComplete()){
            this.nextLevel();
            return 0;
        };
        if(this.isLose()){
            this.gameOver();
        }
    }
    
    nextLevel(){
        this.buffPods = [];
        this.balls = [];
        this.initializeBalls();
        this.bricks = [];
        this.actualLevel++;
        this.initializeBricks(this.actualLevel);
        this.ballSpeed -= 0.10;
        if(this.ballSpeed<=1)this.ballSpeed=1;
    }
    
    updatePlate(){
        if(this.buffManager.isBlueBuffActive() && this.plate.width === this.plateWidth){
            this.plate.width = this.plateWidth + 45;
            this.plate.x = this.plate.x - 22;
        }
        if(!this.buffManager.isBlueBuffActive()){
            this.plate.width = this.plateWidth;
        }
    }
    
    isLose(){
        if(this.balls.length === 0){
            return true;
        }return false;
    }
    
    gameOver(){
        this.isGameOver = true;
    }
    
    generateBuffPod(x,y){
        let rand = getRandomInt(1000);
        if (rand<40){
             let buff = new BuffPod(x,y,"redBuff");
             this.buffPods.push(buff);
        }
        if (rand>=40 && rand < 130){
             let buff = new BuffPod(x,y,"blueBuff");
             this.buffPods.push(buff);
        }
        if (rand>=130 && rand<180){
             let buff = new BuffPod(x,y,"multiBall");
             this.buffPods.push(buff);
        }
        if (rand>=180 && rand<220){
             let buff = new BuffPod(x,y,"slowBalls");
             this.buffPods.push(buff);
        }
    }
    
    
    next(input){
        this.updateBalls(input);
        this.updateBuffPods();
        this.updatePlate();
        this.updateState();
        console.log(this.balls[0].alpha)
    }
 
    start(input){
        window.setTimeout(() =>{
            this.next(input);
            this.playerMovment(input.tick());
            this.start(input);
        }, 7)
    }
    
    getState(){
        return {
            balls:this.balls.map(ball => ({
                x : ball.x,
                y : ball.y,
                radius : ball.radius,
                color : ball.color
            })),
            bricks:this.bricks.map(brick => ({
                x : brick.x,
                y : brick.y,
                width : brick.width,
                height : brick.height,
                color : brick.color,
                hitToDie : brick.hitToDie
            })),
            buffPods : this.buffPods.map(buffPod => ({
                         x:buffPod.x,
                         y:buffPod.y,
                         width:buffPod.width,
                         height:buffPod.height,
                         effect:buffPod.effect
            })),
            isRedBuffActive: this.buffManager.isRedBuffActive(),
            isBlueBuffActive: this.buffManager.isBlueBuffActive()
            ,
            plate : {x:this.plate.x,
                     y:this.plate.y,
                     width:this.plate.width,
                     height:this.plate.height,
            },
            width: this.width,
            height: this.height,
        }

    }
    
    playerMovment(input){
        if(input === "left" && this.plate.x > 0){
            this.plate.x -= 5.4;
        }
        if(input === "right" && this.plate.x + this.plate.width < this.width ){
            this.plate.x += 5.4; 
        }
        if(input === "spaceBar"){
            this.balls[0].isGoing = true;
        }
    }
    
    
}


function getRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(max));
     }
