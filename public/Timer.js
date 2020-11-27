class Timer {
    constructor(callBack,sec){
        this.sec = sec;
        this.isAlive = true;
        const timer = setInterval(() =>{
            this.sec--
            if (this.sec<= 0){
                callBack();
                clearInterval(timer);
                this.isAlive = false;
            }
        }, 1000);
    }

    addTime(sec){
        this.sec += sec;
    }
}