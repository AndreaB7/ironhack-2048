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

  // Start with two tiles
  this._generateTile();
  this._generateTile();
}

// Generates a tile of 2 or 4 and places it on the board.
Game2048.prototype._generateTile = function() {
  // Set initial value to either 2 with 80%, or 4 with 20%
  var initialValue = (Math.random() < 0.8) ? 2 : 4;
  var emptyTile = this._getAvailablePosition();

  // If empty tile is found, set it on the board
  if (emptyTile) {
    this.board[emptyTile.x][emptyTile.y] = initialValue;
  }
};

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
