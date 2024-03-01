let userScore = 0;
let computerScore = 0;
const choices = document.querySelectorAll(".choice");
const res =  document.getElementById("msg");
const US = document.getElementById("user-score");
const CS = document.getElementById("computer-score");
const ScoreLogic = (user , computer) => {
    if (computer === user) {
       res.innerText = " Tie ";
    }
    if(computer === "rock" && user === "scissor" || computer === "scissor" && user === "paper"){
        computerScore++;
        CS.innerText = computerScore;
        res.innerText = " Computer Won ";
    }
    if(user === "rock" && computer === "scissor" || user === "scissor" && computer === "paper"){
        userScore++;
        US.innerText = userScore;
        res.innerText = " User Won ";
    }
}

const generate_Computer_Choice = () => {                    // itni array ki size usse multiply krna h 
    const options = ["rock","paper","scissor"];             // math.random 0 se 1 k bich m number generate krta h 
    const randomIndex = Math.floor(Math.random() *3);       // math.floor number ko int m convert kr deta h
    return options[randomIndex];
}
const playGame = (UC) =>{
    // GENERATE COMPUTER CHOICE
    const computerChoice = generate_Computer_Choice();
    ScoreLogic(UC , computerChoice);
}
choices.forEach((choice) => {
    choice.addEventListener("click",() => {
        const UserChoice = choice.getAttribute("id");
        playGame(UserChoice);
    })
});