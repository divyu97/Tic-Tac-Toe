const dialog = document.querySelector("dialog");
const cells = document.querySelectorAll(".game-cell");
document.querySelector(".game-board").setAttribute("style", "color: bisque");

document.querySelector(".new-game").addEventListener("click", () => dialog.showModal());
document.querySelector(".close-dialog").addEventListener("click", () => {
    dialog.close();
    document.querySelector("#player-1").value = "";
    document.querySelector("#player-2").value = "";
});

const gameBoard = (function() {
    const gameboard = ["", "", "", "", "", "", "", "", ""];
    let player1 = "";
    let player2 = "";
    let currentTurn = "";
    let currentChoice = "";
    return {gameboard, player1, player2, currentTurn, currentChoice};
})();

const displayController = (function() {
    let currentTurn = document.querySelector(".current-turn");
    let show = function() {
        cells.forEach((cell) => cell.innerHTML = gameBoard.gameboard[Number(cell.getAttribute("data-index"))]);
        currentTurn.innerHTML = `Current Turn: ${gameBoard.currentTurn} (${gameBoard.currentChoice})`;
    };
    let reset = function() {
        cells.forEach((cell) => cell.innerHTML = "");
        currentTurn.setAttribute("style", "display: none");
    };
    return {show, reset};
})();

document.querySelector(".start-game").addEventListener("click", () => {
    let user1 = document.querySelector("#player-1").value;
    let user2 = document.querySelector("#player-2").value;
    if (user1 === "" || user2 === "")
        alert("Usernames can't be empty");
    else {
        gameBoard.player1 = user1;
        gameBoard.player2 = user2;
        gameBoard.currentTurn = user1;
        gameBoard.currentChoice = "✖";
        document.querySelector(".game-info").setAttribute("style", "display: flex");
        document.querySelector(".current-turn").innerHTML += `${user1} (✖)`;
        dialog.close();
        document.querySelector("#player-1").value = "";
        document.querySelector("#player-2").value = "";
        document.querySelector(".reset-game").setAttribute("style", "display: inline");
        document.querySelector(".new-game").setAttribute("style", "display: none");
        cells.forEach((cell) => {
            cell.addEventListener("click", () => {
                let index = Number(cell.getAttribute("data-index"));
                if (gameBoard.gameboard[index] === "") {
                    gameBoard.gameboard[index] = gameBoard.currentChoice;
                    gameBoard.currentTurn = (gameBoard.currentTurn === user1)?user2:user1;
                    gameBoard.currentChoice = (gameBoard.currentChoice === "✖")?"◯":"✖";
                    cell.setAttribute("style", "color: black");
                    displayController.show();
                }
            });
        });
    }
});