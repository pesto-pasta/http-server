const mazeBoard = document.getElementById("mazeboard");
const tiles = [];


for (let i = 0; i < 10; i++) {
    const mazeRow = document.createElement("div");
    mazeBoard.appendChild(mazeRow);
    for (let j = 0; j < 10; j++) {
        const tile = document.createElement("div");
        tile.classList.add("tile");
        mazeRow.appendChild(tile);
        tiles.push(tile);
    }

}
console.log(tiles);
let playerTile = 99;
let playerTrail = 99;
let begin = true;

let moveThePlayer = (player, formerPlayer, beg) => {
    tiles[formerPlayer].classList.replace("mazeplayer", "tile");
    tiles[player].classList.add("mazeplayer");
    tiles[player].innerText = ".";
    if (!beg) { tiles[formerPlayer].innerText = "been here." }
}


let move = (direction) => {
    playerTrail = playerTile;  //the trail is set to where we the player is
    playerTile += direction;          //the player is moved to the new position
    moveThePlayer(playerTile, playerTrail);
}


//returns the various directions of movement
let up = (mod) => { return mod * -10; }
let down = (mod) => { return mod * 10; }
let left = (mod) => {
    if ((playerTile) % 10 === 0) {
        begin = false; return 0;
    } else {
        return mod * -1;
    }
}
let right = (mod) => {
    if ((playerTile + 1) % 10 === 0) { begin = false; return 0; } else { return mod * 1; }
}


//set player starting position to 90 (bottom left)
moveThePlayer(playerTile, playerTrail, begin);


//listen for key presses, call the correct player-moving functions
window.addEventListener("keypress", (ev) => {
    let speedModifier = ev.ctrlKey ? 2 : 1;

    if (ev.key === "w") { move(up(speedModifier)); }
    else if (ev.key === "s") { move(down(speedModifier)); }
    else if (ev.key === "d") { move(right(speedModifier)); }
    else if (ev.key === "a") { move(left(speedModifier)); }
    else { console.log("Invalid Key Press"); }

    console.log(`You pressed the "${ev.key}" key`);
    console.log(ev);
    console.log(`speed modifier ${speedModifier}`);

})




