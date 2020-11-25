const bille = document.getElementById("bille");
const billeRed = document.getElementById("billeRed");
const backGround = document.getElementById("backGround");
const brique = document.getElementById("brique");
const plateCenter = document.getElementById("plateCenter");
const plateLeft = document.getElementById("plateLeft");
const plateRight = document.getElementById("plateRight");
const briqueRed = document.getElementById("briqueRed");
const briqueBlue = document.getElementById("briqueBlue");
const briqueGreen = document.getElementById("briqueGreen");
const briqueOrange = document.getElementById("briqueOrange");
const briquePurple = document.getElementById("briquePurple");
const briqueYellow = document.getElementById("briqueYellow");
const GameOver = document.getElementById("GameOver");
const canvasDom = document.querySelector('#canvas');
const ctx = canvasDom.getContext('2d');


function loop(looping) {
    const innerloop = () => {
        looping();
        requestAnimationFrame(innerloop);
    }
    innerloop();
}


function setUp() {
    const brickBreaker = new BrickBreaker();
    const spacePressManager = new KeyPressManager(() => {}, " ")
    const upPressManager = new KeyPressManager(() => {}, "ArrowUp")
    const downPressManager = new KeyPressManager(() => {}, "ArrowDown")
    const inputManager = new InputManager();
    brickBreaker.setGame(1000,600);
    console.log(brickBreaker.game);
    brickBreaker.game.nextLevel();
    brickBreaker.game.start(inputManager);
    loop(() => {
        if (!brickBreaker.game.isGameOver) {
            render(brickBreaker.game.getState());
        }
        else {
            renderGameOverScreen(brickBreaker.game.getState());
        }



    })
    //     const loopMenu = () =>{
    //                 if(inputManager.tick()==="spaceBar"){
    //                     brickBreaker.setGame();
    //                     const inputManager = new InputManager();
    //                     brickBreaker.game.nextLevel();

    //                             const loopGame = () =>{
    //                                 if(!brickBreaker.game.isGameOver){
    //                                 brickBreaker.game.next();
    //                                 brickBreaker.game.playerMovment(inputManager.tick());
    //                                 render(brickBreaker.game.getState());
    //                                 requestAnimationFrame(loopGame);
    //                                 }else{
    //                                 renderGameOverScreen(brickBreaker.game.getState());}

    //                             };

    //                             requestAnimationFrame(loopGame);
    //                     }
    //           requestAnimationFrame(loopMenu);  
    //     }
    //     console.log("dansLeMenu");
    //     requestAnimationFrame(loopMenu);
    // 
}

document.addEventListener('DOMContentLoaded', setUp);

function drawBall(ballState, state) {
    if (state.isRedBuffActive) {
        ctx.drawImage(billeRed, ballState.x - (ballState.radius / 2), ballState.y - (ballState.radius / 2, ballState.radius * 2, ballState.radius * 2));
    }
    else {
        ctx.drawImage(bille, ballState.x - (ballState.radius / 2), ballState.y - (ballState.radius / 2), ballState.radius * 2, ballState.radius * 2);
    }
}

function drawRectangle(brickState) {
    ctx.fillStyle = brickState.color;
    ctx.beginPath();
    ctx.fillRect(brickState.x, brickState.y, brickState.width, brickState.height);
    ctx.fill();
}

function drawBuffPod(buffPod) {

    switch (buffPod.effect) {
        case "redBuff":
            ctx.fillStyle = "red";
            break;
        case "blueBuff":
            ctx.fillStyle = "blue";
            break;
        case "multiBall":
            ctx.fillStyle = "grey";
            break;
        case "slowBalls":
            ctx.fillStyle = "green";
            break;
    }
    ctx.beginPath();
    ctx.fillRect(buffPod.x, buffPod.y, buffPod.width, buffPod.height);
    ctx.fill();
}


function renderGameOverScreen(state) {
    ctx.clearRect(0, 0, canvasDom.width, canvasDom.height);
    drawBackground(state);

    ctx.drawImage(GameOver, (state.width - GameOver.width) / 2, (state.height - GameOver.height) / 2);
}

function drawBrick(brick) {
    switch (brick.color) {
        case "red":
            ctx.drawImage(briqueRed, brick.x, brick.y, brick.width, brick.height);
            break;
        case "green":
            ctx.drawImage(briqueGreen, brick.x, brick.y, brick.width, brick.height);
            break;
        case "purple":
            ctx.drawImage(briquePurple, brick.x, brick.y, brick.width, brick.height);
            break;
        case "blue":
            ctx.drawImage(briqueBlue, brick.x, brick.y, brick.width, brick.height);
            break;
        case "orange":
            ctx.drawImage(briqueOrange, brick.x, brick.y, brick.width, brick.height);
            break;
        case "yellow":
            ctx.drawImage(briqueYellow, brick.x, brick.y, brick.width, brick.height);
    }
}

function drawMenu(state) {

}

function drawBackground(state) {
    ctx.drawImage(backGround, 0, 0, state.width,state.height);
    //     ctx.fillStyle  =  state.color;
    //     ctx.beginPath();
    //  	ctx.fillRect(0,0, state.width,state.height);
    // 	ctx.fill();
}

function drawPlate(state) {
    ctx.drawImage(plateCenter, state.x + ((1 / 5) * state.width), state.y, state.width * (3 / 5), state.height);
    ctx.drawImage(plateLeft, state.x, state.y, state.width / 5, state.height);
    ctx.drawImage(plateRight, state.x + ((4 / 5) * state.width), state.y, state.width / 5, state.height);
}


function render(state) {


    ctx.clearRect(0, 0, canvasDom.width, canvasDom.height);

    drawBackground(state);

    for (const ball of state.balls) {
        drawBall(ball, state);
    }

    for (const brick of state.bricks) {
        if (brick.hitToDie > 0) {
            drawBrick(brick)
        }
    }
    for (const buffPod of state.buffPods) {
        drawBuffPod(buffPod);
    }
    drawPlate(state.plate)
}
