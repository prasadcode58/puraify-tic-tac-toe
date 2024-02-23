const boxes = document.querySelectorAll("#box");
const gameInfo = document.getElementById('gameInfo');
const box = document.getElementById('box');
const newGameBtn = document.getElementById('newGameBtn');

let currentPlayer;
let gameGrid;

const winningPosition = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

function initGame(){
    currentPlayer = "X";
    gameGrid = ["","","","","","","","",""];
    boxes.forEach((box) => {
        box.innerHTML = "";
        box.classList.remove('bg-[#e3ad674b]');
        box.style.pointerEvents = "all";
    });
    newGameBtn.classList.remove('flex');
    newGameBtn.classList.add('hidden');
    gameInfo.innerText = `Player turn : ${currentPlayer}`;
}

initGame();

function swapTurn() {
    if(currentPlayer === "X") {
        currentPlayer = "O";
    }
    else{
        currentPlayer = "X";
    }

    gameInfo.innerText = `Player turn : ${currentPlayer}`;
}


function checkGameOver(){

    let answer = "";

    winningPosition.forEach((position) =>{
        if((gameGrid[position[0]] !== "" || gameGrid[position[1]] !== "" || gameGrid[position[2]] !== "")
            && (gameGrid[position[0]] === gameGrid[position[1]]) && (gameGrid[position[1]] === gameGrid[position[2]])) {
                
                if(gameGrid[position[0]] === "X"){
                    answer = "X";
                }
                else{
                    answer = "O";
                }

                boxes.forEach((box) => {
                    box.style.pointerEvents = "none";
                })

                boxes[position[0]].classList.add('bg-[#e3ad674b]');
                boxes[position[1]].classList.add('bg-[#e3ad674b]');
                boxes[position[2]].classList.add('bg-[#e3ad674b]');
        }

        if(answer !== ""){
            gameInfo.innerText = `Winner Player : ${answer}`;
            newGameBtn.classList.add('flex');
            newGameBtn.classList.remove('hidden');
            return;
        }

        let emptyCount = 0;

        gameGrid.forEach((box) => {
            if(box !== "" ){
                emptyCount++;
            }
        })

        if(emptyCount === 9){
            gameInfo.innerText = "Game Tied !";
            newGameBtn.classList.add('flex');
            newGameBtn.classList.remove('hidden');
        }


    })
    
}

function handleClick(index){
    if(gameGrid[index] === ""){
        boxes[index].innerHTML = currentPlayer;
        gameGrid[index] = currentPlayer;
        swapTurn();
        checkGameOver();
    }
}

boxes.forEach((box, index) => {
    box.addEventListener("click", () => {
        handleClick(index);
    })
})

newGameBtn.addEventListener("click", initGame);
