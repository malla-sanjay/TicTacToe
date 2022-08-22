const cells = document.querySelectorAll("div.cell");
const board = document.querySelector(".board");
const winMessage = document.querySelector(".winning-message");
const winner = document.querySelector(".winner");
const winCases = [
    //horizontal strikes
    [0,1,2],
    [3,4,5],
    [6,7,8],

    //vertical strikes
    [0,3,6],
    [1,4,7],
    [2,5,8],

    //diagonal strikes
    [0,4,8],
    [2,4,6]
];
let current;
let turnX;

//adding event listener to reset button
document.querySelector('.reset-button').addEventListener('click', startGame);

//this is the game start/restart function
function startGame() {

    //resetting class and eventlistener
    cells.forEach((cell) => {
        //removing o and x classes
        cell.classList.remove('o');
        cell.classList.remove('x');

        //only once clickable eventlistener removed
        cell.removeEventListener('click', handleClick);
    });

    //reset and remove end game message
    winner.classList.remove("show");
    winMessage.innerText = '';

    //default first turn is set to x [switch turnX to false if you want O turn first]
    turnX = true;
    board.classList.add( turnX ? 'x' : 'o');

    //adding action listener to each cell
    cells.forEach((cell) => {
        cell.addEventListener('click', handleClick, { once: true })
    });
}

function handleClick(event){

    //grabbing the target cell
    const cell = event.target;

    //checking whose turn it is
    current = turnX ? "x" : "o";

    //set the mark
    placeMark(cell, current);

    //check whether to  win/draw/continue
    if (checkForWin(current)) {
        //win
        endGameFromDraw(false);
    }
    else if (checkForDraw()) {
        //draw
        endGameFromDraw(true);

    }
    else {
        //continue
        swapTurn();
    } 

}

const placeMark = (cell, current) => {
    cell.classList.add(current);
}

const swapTurn = () => {
    turnX = !turnX;

    //reset board
    board.classList.remove('x');
    board.classList.remove('o');

    //add current turn to hover
    turnX ? board.classList.add('x') : board.classList.add('o');

}

const checkForWin = (current) => {
    return (winCases.some((winCase) => {
        return (winCase.every((index) => {
            return (cells[index].classList.contains(current));
        }));
    }));
}

const checkForDraw = () => {
    return ([...cells].every((cell) => {
        return (cell.classList.contains('x') || cell.classList.contains('o'))
    }));
}

const endGameFromDraw = (draw) => {
    if (draw) {
        winMessage.innerText = `It's a Draw!`;
    }
    else {
        winMessage.innerText = `${current.toUpperCase()} has won!`;
    }
    winner.classList.add("show");
}

//calling start game
startGame();