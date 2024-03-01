let boxes = document.querySelectorAll('.box');
let reset = document.querySelector('#reset-btn');
let newGameBtn = document.querySelector('#new-btn');
let msg = document.querySelector('#msg');
let msgContainer = document.querySelector('.msg-container');
let undo_btn = document.getElementById('undo-btn');
let turn_O = true;  //2-d array for posiblities of winning
const win_patten = [[0,1,2],[0,3,6],[0,4,8],[1,4,7],[2,5,8],[2,4,6],[3,4,5],[6,7,8]];

const undo = ()=>{
    box.disabled = false;
    box.innerText = "";
};
const resetGame = () =>{
    turn_O = true ;
    for(let box of boxes){
        box.disabled = false;
        box.innerText = "";
        msgContainer.classList.add("hide");
    }
}
const ShowWinner = (winner)=>{
    msg.innerText = `Congratulations , Winner is ${winner}`;
    msgContainer.classList.remove("hide");
    for(let box of boxes){
        box.disabled = true;
    }
};
const checkWinner = ()=>{
    for(let patten of win_patten){
        let pos1 = boxes[patten[0]].innerText;
        let pos2 = boxes[patten[1]].innerText;
        let pos3 = boxes[patten[2]].innerText;
        if(pos1 != "" && pos2 != "" && pos3 != ""){
            if(pos1 === pos2 && pos2 === pos3){
                ShowWinner(pos1);
            }
        }
    }
};
boxes.forEach((box)=>{
    box.addEventListener("click",()=>{
        if(turn_O === true){
            box.innerText = "O";
            turn_O = false;
        }
        else{
            box.innerText = "X";
            turn_O = true;
        }
        box.disabled = true;
        checkWinner();
    });
});
newGameBtn.addEventListener("click",resetGame);
reset.addEventListener("click",resetGame);
undo_btn.addEventListener("click",undo);