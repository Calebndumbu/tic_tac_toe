// Gameboard Module
const Gameboard = (() => {
  let board = ["", "", "", "", "", "", "", "", ""];

  const getBoard = () => board;

  const setMark = (index, marker) => {
    if (board[index] === "") board[index] = marker;
  };

  const resetBoard = () => {
    board = ["", "", "", "", "", "", "", "", ""];
  };

  return { getBoard, setMark, resetBoard };
})();

// Player Factory
const Player = (name, marker) => {
  return { name, marker };
};

// Game Logic Module
const Game = (() => {
  let players = [];
  let currentPlayerIndex = 0;
  let gameOver = false;

  const start = () => {
    players = [Player("Player X", "X"), Player("Player O", "O")];
    currentPlayerIndex = 0;
    gameOver = false;
    Gameboard.resetBoard();
    DisplayController.renderBoard();
    DisplayController.setMessage(`${players[currentPlayerIndex].name}'s turn`);
  };

  const playTurn = (index) => {
    if (gameOver || Gameboard.getBoard()[index] !== "") return;

    Gameboard.setMark(index, players[currentPlayerIndex].marker);
    if (checkWin()) {
      gameOver = true;
      DisplayController.setMessage(`${players[currentPlayerIndex].name} wins!`);
    } else if (checkTie()) {
      gameOver = true;
      DisplayController.setMessage("It's a tie!");
    } else {
      currentPlayerIndex = 1 - currentPlayerIndex; // Switch player
      DisplayController.setMessage(
        `${players[currentPlayerIndex].name}'s turn`
      );
    }
    DisplayController.renderBoard();
  };

  const checkWin = () => {
    const winPatterns = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8], // Rows
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8], // Columns
      [0, 4, 8],
      [2, 4, 6], // Diagonals
    ];

    return winPatterns.some((pattern) =>
      pattern.every(
        (index) =>
          Gameboard.getBoard()[index] === players[currentPlayerIndex].marker
      )
    );
  };

  const checkTie = () => {
    return Gameboard.getBoard().every((cell) => cell !== "");
  };

  const resetGame = () => {
    start(); // Reset game state and UI
  };

  return { start, playTurn, resetGame, gameOver };
})();

// Display Controller Module
const DisplayController = (() => {
  const gameboardDiv = document.getElementById("gameboard");
  const messageDiv = document.getElementById("message");
  const resetBtn = document.getElementById("resetBtn");

  const renderBoard = () => {
    gameboardDiv.innerHTML = ""; // Clear the board

    Gameboard.getBoard().forEach((cell, index) => {
      const cellDiv = document.createElement("div");
      cellDiv.classList.add("cell");
      cellDiv.dataset.index = index;
      cellDiv.textContent = cell;
      gameboardDiv.appendChild(cellDiv);
    });
  };

  const handleCellClick = (e) => {
    const cellIndex = e.target.dataset.index;
    if (!Game.gameOver && !e.target.classList.contains("taken")) {
      Game.playTurn(cellIndex);
    }
  };

  const enableCellClick = () => {
    gameboardDiv.addEventListener("click", handleCellClick);
  };

  const setMessage = (message) => {
    messageDiv.textContent = message;
  };

  // Reset button click event
  resetBtn.addEventListener("click", () => {
    Game.resetGame(); // Reset the game
  });

  return { renderBoard, enableCellClick, setMessage };
})();

// Start the Game After Page Loads
window.addEventListener("DOMContentLoaded", () => {
  Game.start();
  DisplayController.enableCellClick();
});
