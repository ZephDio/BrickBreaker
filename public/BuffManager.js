class BuffManager{
    constructor(){
        this.redBuff = false;
        this.blueBuff= false;
    }
    
    
    applyRedBuff(x){
        if(this.isRedBuffActive()){
            this.redBuff.addTime(x);
        }else{
            this.redBuff= new Timer (() => {},x)
        }
        
    }
    
    isRedBuffActive(){
        if (this.redBuff && this.redBuff.isAlive){
            return true;
        }return false
    }
    
        
    applyBlueBuff(x){
        if(this.isBlueBuffActive()){
            this.blueBuff.addTime(x);
        }else{
            this.blueBuff= new Timer (() => {},x)
        }
        
    }
    
    isBlueBuffActive(){
        if (this.blueBuff && this.blueBuff.isAlive){
            return true;
        }return false
    }
    
    
    
    
    
    
    
    
}