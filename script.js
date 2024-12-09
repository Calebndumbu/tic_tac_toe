const Gameboard = (() => {
  let board = ["", "", "", "", "", "", "", "", ""];

  const getBoard = () => board;

  const setMarker = (index, marker) => {
    if (board[index] === "") {
      board[index] = marker;
    }
  };

  return { getBoard, setMarker };
})();

// Player(name, marker) is the factory function.
// getName() returns the player's name.
// getMarker() returns the player's marker ("X" or "O").

const Player = (name, marker) => {
  const getName = () => name;
  const getMarker = () => marker;
  return { getName, getMarker };
};

const Game = (() => {
  let player1, player2, currentPlayer;
  let gameOver = false;

  const startGame = (name1, name2) => {
    player1 = Player(name1, "X");
    player2 = Player(name2, "O");
    currentPlayer = player1;
    gameOver = false;
    console.log("Game started!");
  };

  const playTurn = (index) => {
    if (gameOver || Gameboard.getBoard()[index] !== "") return;

    Gameboard.setMarker(index, currentPlayer.getMarker());

    if (checkWin()) {
      console.log(`${currentPlayer.getName()} wins!`);
      gameOver = true;
    } else if (checkTie()) {
      console.log("It's a tie!");
      gameOver = true;
    } else {
      switchPlayer();
    }
  };

  const switchPlayer = () => {
    currentPlayer = currentPlayer === player1 ? player2 : player1;
    console.log(`It's ${currentPlayer.getName()}'s turn.`);
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
        (index) => Gameboard.getBoard()[index] === currentPlayer.getMarker()
      )
    );
  };

  const checkTie = () => Gameboard.getBoard().every((cell) => cell !== "");

  return { startGame, playTurn };
})();
