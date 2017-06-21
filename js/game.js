function Game2048() {
  // Two-dimensional array to store the game board
  this.board = [
    [null, null, null, null],
    [null, null, null, null],
    [null, null, null, null],
    [null, null, null, null]
  ];

  // Current score of the game
  this.score  = 0;

  // Track the game status, whether it was won or lost
  this.won   = false;
  this.lost  = false;
}
