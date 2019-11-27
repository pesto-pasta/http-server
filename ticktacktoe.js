
const board = document.getElementById("board");
const resetButton = document.getElementById("resetbutton");
const buttons = [];



//lets build a grid of buttons
for (var i = 0; i < 3; i++) {
    const row = document.createElement("div");
    board.appendChild(row);
    for (var j = 0; j < 3; j++) {
        const button = document.createElement("button");
        button.classList.add("ticktackbutton");   //stylize the buttons

        console.dir(button);
        row.appendChild(button); //this actually draws the button
        buttons.push(button);
    }
}

//lets listen for a button clicked on resetButton
resetButton.addEventListener("click", resetGame);
resetButton.classList.add("resetbutton");

//if button is clicked, run myTurn on that button.
for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener("click", () => { myTurn(i) });
}

let gameOver = false;
let winner = "";
let turnNumber = 0;
let whosTurn = '';
let xScore = document.getElementById("xscore");
let oScore = document.getElementById("oscore");
let catScore = document.getElementById("catscore");


//myTurn will check if a cell is blank, and fill it in with the correct symbol depending on whos turn it is
function myTurn(buttonNumber) {

    let buttonID = parseInt(buttonNumber);
    console.log("you clicked button # " + buttonNumber);

    //check each cell for blank, and if so, fill in correct char depending on turnNumber
    if (buttons[buttonID].innerText !== "X" && buttons[buttonID].innerText !== "O") {  // if the cell is blank...
        if (turnNumber % 2 === 0) {  //if %2=0, it must be X's turn
            buttons[buttonID].innerText = "X";
            whosTurn = 'X';
        }
        if (turnNumber % 2 !== 0) {  //if %2!=0, it must be O's turn
            buttons[buttonID].innerText = "O";
            whosTurn = 'O';
        }
        turnNumber++;
    }

    //Check if anyone has won, and if they have, change the gameOver conditon
    let horizWin = checkHoriz(whosTurn, buttonID);
    let vertWin = checkVert(whosTurn, buttonID);
    let diagWin = checkDiag(whosTurn, buttonID);
    let catsGame = checkCats();
    if (horizWin || vertWin || diagWin) {
        gameOver = true;
        winner = whosTurn;
    } else if (catsGame) {  //if we get here, that means we MUST not have a winner.
        gameOver = true;
        winner = "The Cat";
    }


    //check for gameOver condition and resetGame
    if (gameOver) {
        writeScore();
        setTimeout( () => {
            window.alert(winner + " won the game. Game Over.");
            resetGame();   
        }, 5 );
        
    }
    console.log("Gameover status: " + gameOver);
}

//check for horizontal wins
function checkHoriz(whosTurn, buttonID) {
    let winCount = 0;                               // way to count X's and O's
    for (var i = 0; i <= 6; i += 3) {               //for each row....
        for (var j = 0; j < 3; j++) {               //for each cell....
            console.log(i + j);                     //log which cell were checking
            if (buttons[i + j].innerText === whosTurn) {//if text in cell i+j = whosTurn...
                winCount++;                             //add one to winCount
            }

        }
        if (winCount > 2) {                         //check if you have a win condition
            console.log("********    " + whosTurn + " Won    ********")      //say who won
            return true;
            break;
        } else {
            winCount = 0;                        //if not, reset winCount
        }
        console.log("checked row");
    }
}

//check for vertical wins
function checkVert(whosTurn, buttonID) {
    let winCount = 0;                               // way to count X's and O's
    for (var i = 0; i < 3; i++) {                 //for each column....
        for (var j = 0; j <= 6; j += 3) {           //for each cell....
            console.log(i + j);                     //log which cell were checking
            if (buttons[i + j].innerText === whosTurn) {//if text in cell i+j = whosTurn...
                winCount++;                             //add one to winCount
            }

        }
        if (winCount > 2) {                         //check if you have a win condition
            console.log("********    " + whosTurn + " Won    ********")      //say who won
            return true;
            break;
        } else {
            winCount = 0;                        //if not, reset winCount
        }
        console.log("checked column");
    }
}

function checkDiag(whosTurn, buttonID) {
    let winCount = 0;                               // way to count X's and O's

    //lets check reverse diagonal
    for (var i = 1; i <= 3; i++) {                  //for each cell                                          
        console.log(i * 2);                         //log which cell were checking
        if (buttons[i * 2].innerText === whosTurn) {//if text in cell i*2 = whosTurn...
            winCount++;                             //add one to winCount
        }
    }
    if (winCount > 2) {                         //check if you have a win condition
        console.log("********    " + whosTurn + " Won    ********")      //say who won
        return true;
    } else {
        winCount = 0;                        //if not, reset winCount
    }

    console.log("Checked Reverse Diag")

    //lets check forward diagonal
    for (var i = 0; i < 3; i++) {                  //for each cell                                          
        console.log(i * 4);                         //log which cell were checking
        if (buttons[i * 4].innerText === whosTurn) {//if text in cell i*2 = whosTurn...
            winCount++;                             //add one to winCount
        }
    }
    if (winCount > 2) {                         //check if you have a win condition
        console.log("********    " + whosTurn + " Won    ********")      //say who won
        return true;
    } else {
        winCount = 0;                        //if not, reset winCount
    }

    console.log("Checked Forward Diag");


}

function checkCats() {

    //count all the filled spaces
    let filledSpaces = 0;
    for (let i = 0; i < buttons.length; i++) {
        if (buttons[i].innerText === 'X' || buttons[i].innerText === 'O') {
            filledSpaces++;
        }
    }

    //if its 9, cats game.
    if (filledSpaces === 9) {
        return true;
    } else { return false };
}

function resetGame() {
    console.log("You reset the game");

    //reset the game board and gameOver status
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].innerText = "";
    }
    gameOver = false;
    turnNumber = 0;
    winner = "";
}

function writeScore() {
    if (winner === 'X') {
        xScore.innerText = parseInt(xScore.innerText) + 1;
    } else if (winner === 'O') {
        oScore.innerText = parseInt(oScore.innerText) + 1;
    } else {
        catScore.innerText = parseInt(catScore.innerText) + 1;
    }
}


