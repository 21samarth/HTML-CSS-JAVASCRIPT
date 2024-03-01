//varibles of the game
let board = document.getElementById("board");
let inputDir={x:0 , y:0};
const foodsound = new Audio('food.mp3');
const keysound = new Audio('keypress.mp3');
const gameoversound = new Audio ('gameover.m4a');
let lastPaintTime = 0;
let snakeArr = [{x:13,y:15}];
let food = {x:6 , y:7};
let score = 0;
let scr = document.getElementById("score");
let hiscr = document.getElementById("hiscore");



// game functions

function main(ctime) {
    window.requestAnimationFrame(main);
    // console.log(ctime);
    if((ctime - lastPaintTime)/1000 < 1/5 ){
        return
    }
    lastPaintTime = ctime;
    gameEngine();
}
function iscolide(snake){
    // if snake dump itself
    for (let i=1; i < snakeArr.length; i++){
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
            return true;
        }
    }
    // if snake dump the wall
    if(snake[0].x >= 18 || snake[0].x<=0 || snake[0].y >= 18 || snake[0].y<=0 ){
        return true; 
   }
       
}

function gameEngine(){
    if(iscolide(snakeArr)){
        gameoversound.play();
        inputDir={x:0 , y:0};
        alert("Game over press any key to play again");
        snakeArr = [{x:13,y:15}];
        score = 0;
    }
    // if snake eat the food
    if(snakeArr[0].y === food.y && snakeArr[0].x === food.x){
        foodsound.play();
        score += 1;
        if(score>hiscoreval){
            hiscoreval = score;
            localStorage.setItem("hiscr", JSON.stringify(hiscr));
            hiscr.innerHTML = "Hiscore : " + hiscoreval;
        }
        scr.innerHTML = "Score : " + score;
        snakeArr.unshift({x: snakeArr[0].x + inputDir.x , y: snakeArr[0].y + inputDir.y});
        let a= 2;
        let b = 16;
        food = {x: Math.round(a+(b-a)* Math.random()), y: Math.round(a+(b-a)* Math.random())}
    }

    //moving snake
    for (let i = snakeArr.length -2; i >= 0; i--) {
        snakeArr[i+1] = {...snakeArr[i]};  
    }
    snakeArr[0].y += inputDir.y;
    snakeArr[0].x += inputDir.x;

    // display snake
    board.innerHTML = "";
    snakeArr.forEach((e,index)=>{
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        if(index === 0){
            snakeElement.classList.add('head');
        }
        else{
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);
    });
// display food
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement);
}



let hiscore = localStorage.getItem("hiscr");
let hiscoreval = 0;
if(hiscore = null){
    localStorage.setItem("hiscore", JSON.stringify(hiscoreval))
}
else{
    hiscoreval = JSON.parse(hiscore);
    hiscr.innerHTML = "Hiscore" + hiscoreval;
}

window.requestAnimationFrame(main);

window.addEventListener('keydown', e =>{
    inputDir = {x:0 , y:1}
    keysound.play();
    switch(e.key){
        case "ArrowUp":
            // console.log("ArrowUp");
            inputDir.x = 0;
            inputDir.y = -1;
            break;
        case "ArrowDown":
            // console.log("ArrowDown");
            inputDir.x = 0;
            inputDir.y = 1;
            break;
        case "ArrowRight":
            // console.log("ArrowRight");
            inputDir.x = 1;
            inputDir.y = 0;
            break;
        case "ArrowLeft":
            // console.log("ArrowLeft");
            inputDir.x = -1;
            inputDir.y = 0;
            break;
        default:
            break;
    }
});