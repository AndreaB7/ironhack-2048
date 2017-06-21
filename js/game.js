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

// Renders the board in the console
Game2048.prototype._renderBoard = function() {
  this.board.forEach(function(row) {
    console.log(row);
  });
};

// Moves each row to the left and merges if necessary
Game2048.prototype.moveLeft = function() {
  // Keep new values in a new array
  var newBoard = [];

  // Store whether board has changed
  var boardChanged = false;

  var that = this;

  // Loop through each row of the current board
  that.board.forEach (function(row) {

    // Store a newRow without null values
    var newRow = row.filter(function(i) {
      return i !== null;
    });

    // Loop through each value in a newRow and if adjacent
    // value is equal to the current one, double the current value and
    // set to null the adjacent value
    for (i = 0; i < newRow.length - 1; i++) {
      if (newRow[i+1] === newRow[i]) {
        newRow[i]   = newRow[i] * 2;
        newRow[i+1] = null;
      }
    }

    // Store non-null values of a newRow in a mergedRow
    var mergedRow = newRow.filter(function(i) {
      return i !== null;
    });

    // Fill up mergedRow with remaining null values
    while(mergedRow.length < 4) {
      mergedRow.push(null);
    }

    // Set that board has changed if mergedRow is different from original row
    if (!that._equalArrays(row, mergedRow)) {
      boardChanged = true;
    }

    // Add the mergedRow to a new board and process the next row
    newBoard.push(mergedRow);
  });

  // Finally re-assign to new board and return whether board has changed
  this.board = newBoard;
  return boardChanged;
};

// Moves each row to the right and merges if necessary
Game2048.prototype.moveRight = function() {
  // Keep new values in a new array
  var newBoard = [];

  // Store whether board has changed
  var boardChanged = false;

  var that = this;

  // Loop through each row of the current board
  that.board.forEach (function(row) {

    // Store a newRow without null values
    var newRow = row.filter(function(i) {
      return i !== null;
    });

    // Loop through each value in a newRow from right to left and if adjacent
    // value is equal to the current one, double the current value and
    // set to null the adjacent value
    for (i = newRow.length - 1; i > 0; i--) {
      if (newRow[i-1] === newRow[i]) {
        newRow[i]   = newRow[i] * 2;
        newRow[i-1] = null;
      }
    }

    // Store non-null values of a newRow in a mergedRow
    var mergedRow = newRow.filter(function(i) {
      return i !== null;
    });

    // Fill up mergedRow with remaining null values
    while(mergedRow.length < 4) {
      mergedRow.unshift(null);
    }

    // Set that board has changed if mergedRow is different from original row
    if (!that._equalArrays(row, mergedRow)) {
      boardChanged = true;
    }

    // Add the mergedRow to a new board and process the next row
    newBoard.push(mergedRow);
  });

  // Finally re-assign to new board and return whether board has changed
  this.board = newBoard;
  return boardChanged;
};

// Transposes board matrix, moves to the left and transposes back
Game2048.prototype.moveUp = function() {
  this._transposeMatrix();
  var boardChanged = this._moveLeft();
  this._transposeMatrix();
  return boardChanged;
};

// Transposes board matrix, moves to the right and transposes back
Game2048.prototype.moveDown = function () {
  this._transposeMatrix();
  var boardChanged = this._moveRight();
  this._transposeMatrix();
  return boardChanged;
};

Game2048.prototype._equalArrays = function(arr1, arr2) {
  return (arr1.length == arr2.length) && arr1.every(function(element, index) {
    return element === arr2[index];
  });
};

Game2048.prototype._transposeMatrix = function() {
  for (var row = 0; row < 4; row++) {
    for (var column = row+1; column < 4; column++) {
      var temp = this.board[row][column];
      this.board[row][column] = this.board[column][row];
      this.board[column][row] = temp;
    }
  }
};
