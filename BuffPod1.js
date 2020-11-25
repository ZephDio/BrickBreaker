class BuffPod{
    constructor(x,y,effect){
        this.x = x;
        this.y = y;
        this.width = 20;
        this.height = 20;
        this.effect = effect;
    }

    next(){
        this.y += 2;
    }
}