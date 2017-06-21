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

// Finds empty position on the board
Game2048.prototype._getAvailablePosition = function() {
  // Store all emoty slots on the board
  var emptyTiles = [];

  // Iterate over board array and if the slot is empty
  // store the coordinates of this position in emptyTiles
  this.board.forEach(function(row, rowIndex) {
    row.forEach(function(elem, colIndex) {
      if (!elem) emptyTiles.push({ x: rowIndex, y: colIndex });
    });
  });

  // If it's full, return false
  if (emptyTiles.length === 0)
    return false;

  // Otherwise, get the random position and return its coordinates
  var randomPosition = Math.floor(Math.random() * emptyTiles.length);
  return emptyTiles[randomPosition];
};
