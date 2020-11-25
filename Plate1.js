class Plate {
    constructor(x,y,width,height){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }
    

     contains(x,y){
        const isWithinY= (y > this.y && y < this.y + this.height);
        const isWithinX= (x > this.x && x < this.x + this.width);
        if (isWithinX && isWithinY)return true;
        return false;
    }
    
}