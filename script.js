const cells = document.querySelectorAll("div.cell");
const board = document.querySelector(".board");
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

//setting default turn to X 
//[switch turnX to false if you want O turn first]
let turnX = true;
board.classList.add( turnX ? 'x' : 'o');


//adding action listener to each cell
cells.forEach((cell) => {
    cell.addEventListener('click', handleClick, { once: true })
});

function handleClick(event){

    //grabbing the target cell
    const cell = event.target;

    //checking whose turn it is
    const current = turnX ? "x" : "o";

    //set the mark
    placeMark(cell, current);

    //check for win (display win message if win)
    checkForWin(current) ? console.log(`winner is ${current}`): console.log("next turn");

    //check for draw (display draw message if draw)


    //switch turn
    swapTurn();
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
        return(winCase.every((index) => {
            return(cells[index].classList.contains(current));
        }));
    }));
}