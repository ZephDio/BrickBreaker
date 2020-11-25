
class Brick {
    constructor(color,x,y,grillPoseX,grillPoseY,width,height,hitToDie){
        this.color = color;
        this.x= x;
        this.y= y;
        this.grillPoseX = grillPoseX;
        this.grillPoseY = grillPoseY;
        this.width= width;
        this.height= height;
        this.hitToDie = hitToDie;
    }
    

    contains(point){
        if(this.hitToDie <= 0)return false;
        const isWithinY= (point.y > this.y && point.y < this.y + this.height);
        const isWithinX= (point.x > this.x && point.x < this.x + this.width);
        if (isWithinX && isWithinY)return true;
        return false;
    }
    
    
    bouncingOnSide(ball){
        const isBouncingOnLeftSide = ball.x < this.x + (0.08 * this.width);
        if(isBouncingOnLeftSide){
            
            return true
        }
        const isBouncingOnRightSide= ball.x > this.x + this.width - (0.08 * this.width);
        if(isBouncingOnRightSide){
            return true
        }
        return false;
    }
    
    bouncingOnHorizontalSide(ball){
        const isBouncingOnBottomSide = ball.y < this.y + (0.15 * this.height);
        if(isBouncingOnBottomSide){
            
            return true
        }
        const isBouncingOnTopSide= ball.y > this.y + this.height - (0.15 * this.height);
        if(isBouncingOnTopSide){
            return true
        }
        return false;
    }
    
    hit(){
        this.hitToDie--;
    }
}