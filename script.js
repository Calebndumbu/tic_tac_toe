const Gameboard = () => {
  //private variable
  let board = ["", "", "", "", "", ""];

  //public methods

  // Board is a private array holding the game state.

  // getBoard returns the current gameboard
  //for use elsewhere.

  // setMarker(index, marker) places a marker
  // ("X" or "O") if the spot is empty.

  let getBoard = () => board;

  const setMarker = (index, marker) => {
    if (board[index] === "") {
      board[index] = marker;
    }
  };

  return { getBoard, setMarker };
};
