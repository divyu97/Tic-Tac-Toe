const dialog = document.querySelector("dialog");
const cells = document.querySelectorAll(".game-cell");
const currentTurn = document.querySelector(".current-turn");
document.querySelector(".game-board").setAttribute("style", "color: bisque");

dialog.addEventListener("click", (event) => {
    if (event.target === dialog) {
        dialog.close();
        document.querySelector("#player-1").value = "";
        document.querySelector("#player-2").value = "";
    }
});

document.querySelector(".new-game").addEventListener("click", () => dialog.showModal());
document.querySelector(".close-dialog").addEventListener("click", () => {
    dialog.close();
    document.querySelector("#player-1").value = "";
    document.querySelector("#player-2").value = "";
});

function actualReset() {
    displayController.reset();
    displayController.show();
    currentTurn.innerHTML = "Current Turn: ";
    document.querySelector('.game-cell[data-index="0"]').innerHTML = "✖";
    document.querySelector('.game-cell[data-index="1"]').innerHTML = "◯";
}

document.querySelector(".reset-game").addEventListener("click", actualReset);

const gameBoard = (function() {
    const gameboard = ["", "", "", "", "", "", "", "", ""];
    let player1 = "";
    let player2 = "";
    let currentTurn = "";
    let currentChoice = "";
    let checkWinner = function() {
        if ((gameBoard.gameboard[0] === "✖" && gameBoard.gameboard[1] === "✖" && gameBoard.gameboard[2] === "✖") || (gameBoard.gameboard[2] === "✖" && gameBoard.gameboard[5] === "✖" && gameBoard.gameboard[8] === "✖") || (gameBoard.gameboard[8] === "✖" && gameBoard.gameboard[7] === "✖" && gameBoard.gameboard[6] === "✖") || (gameBoard.gameboard[6] === "✖" && gameBoard.gameboard[3] === "✖" && gameBoard.gameboard[0] === "✖") || (gameBoard.gameboard[3] === "✖" && gameBoard.gameboard[4] === "✖" && gameBoard.gameboard[5] === "✖") || (gameBoard.gameboard[1] === "✖" && gameBoard.gameboard[4] === "✖" && gameBoard.gameboard[7] === "✖")) {
            alert(`${this.player1} won!`);
            actualReset();
        }
        else if ((gameBoard.gameboard[0] === "◯" && gameBoard.gameboard[1] === "◯" && gameBoard.gameboard[2] === "◯") || (gameBoard.gameboard[2] === "◯" && gameBoard.gameboard[5] === "◯" && gameBoard.gameboard[8] === "◯") || (gameBoard.gameboard[8] === "◯" && gameBoard.gameboard[7] === "◯" && gameBoard.gameboard[6] === "◯") || (gameBoard.gameboard[6] === "◯" && gameBoard.gameboard[3] === "◯" && gameBoard.gameboard[0] === "◯") || (gameBoard.gameboard[3] === "◯" && gameBoard.gameboard[4] === "◯" && gameBoard.gameboard[5] === "◯") || (gameBoard.gameboard[1] === "◯" && gameBoard.gameboard[4] === "◯" && gameBoard.gameboard[7] === "◯")) {
            alert(`${this.player2} won!`);
            actualReset();
        }
        else if ((gameBoard.gameboard[0] === "✖" && gameBoard.gameboard[4] === "✖" && gameBoard.gameboard[8] === "✖") || (gameBoard.gameboard[2] === "✖" && gameBoard.gameboard[4] === "✖" && gameBoard.gameboard[6] === "✖")) {
            alert(`${this.player1} won!`);
            actualReset();
        }
        else if ((gameBoard.gameboard[0] === "◯" && gameBoard.gameboard[4] === "◯" && gameBoard.gameboard[8] === "◯") || (gameBoard.gameboard[2] === "◯" && gameBoard.gameboard[4] === "◯" && gameBoard.gameboard[6] === "◯")) {
            alert(`${this.player2} won!`);
            actualReset();
        } else {
            for (let i = 0; i < 9; i++) {
                if (gameBoard.gameboard[i] === "")
                    break;
                else if (gameBoard.gameboard[i] !== "" && i == 8) {
                    alert("It's a tie!");
                    actualReset();
                }
            }
        }
    }
    return {gameboard, player1, player2, currentTurn, currentChoice, checkWinner};
})();

const displayController = (function() {
    let show = function() {
        cells.forEach((cell) => cell.innerHTML = gameBoard.gameboard[Number(cell.getAttribute("data-index"))]);
        currentTurn.innerHTML = `Current Turn: ${gameBoard.currentTurn} (${gameBoard.currentChoice})`;
    };
    let reset = function() {
        cells.forEach((cell) => {
            gameBoard.gameboard[Number(cell.getAttribute("data-index"))] = "";
            cell.setAttribute("style", "color: bisque");
        });
        document.querySelector(".game-info").setAttribute("style", "display: none");
        document.querySelector(".reset-game").setAttribute("style", "display: none");
        document.querySelector(".new-game").setAttribute("style", "display: inline");
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
                    gameBoard.checkWinner();
                }
            }, {once: true});
        });
    }
});