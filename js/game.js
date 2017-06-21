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
  this.board.forEach(function(row) { console.log(row); });
  console.log('Score: ' + this.score);
};

// Moves each row to the left and merges if necessary
Game2048.prototype._moveLeft = function() {
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

        that._updateScore(newRow[i]);
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
Game2048.prototype._moveRight = function() {
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

        that._updateScore(newRow[i]);
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
Game2048.prototype._moveUp = function() {
  this._transposeMatrix();
  var boardChanged = this._moveLeft();
  this._transposeMatrix();
  return boardChanged;
};

// Transposes board matrix, moves to the right and transposes back
Game2048.prototype._moveDown = function () {
  this._transposeMatrix();
  var boardChanged = this._moveRight();
  this._transposeMatrix();
  return boardChanged;
};

// Moves to given direction and generates a new tile if board changed
Game2048.prototype.move = function(direction) {
  if (!this._gameFinished()) {
    switch (direction) {
      case "up":    boardChanged = this._moveUp();    break;
      case "down":  boardChanged = this._moveDown();  break;
      case "left":  boardChanged = this._moveLeft();  break;
      case "right": boardChanged = this._moveRight(); break;
    }

    if (boardChanged) {
      // if board changed, try to generate a new tile
      this._generateTile();
      // and check if the game is lost
      this._isGameLost();
    }
  }
};

Game2048.prototype.win = function() {
  return this.won;
};

// Checks whether the game is lost
Game2048.prototype._isGameLost = function() {
  // Return if there are still positions left - not lost
  if (this._getAvailablePosition()) return;

  var that   = this;
  // By default, assume there are no moves left and game is lost
  var isLost = true;

  // Iterate over board array and pick the top, left, bottom and right
  // cell values. If any of them is equal to the currently iterated cell,
  // assume there is a move left (merge) and set isLost to false.
  this.board.forEach(function(row, rowIndex) {
    row.forEach(function(elem, colIndex) {
      var current = that.board[rowIndex][colIndex];
      var top, bottom, left, right;

      if (that.board[rowIndex][colIndex - 1]) {
        left = that.board[rowIndex][colIndex - 1];
      }
      if (that.board[rowIndex][colIndex + 1]) {
        right = that.board[rowIndex][colIndex + 1];
      }
      if (that.board[rowIndex - 1]) {
        top = that.board[rowIndex - 1][colIndex];
      }
      if (that.board[rowIndex + 1]) {
        bottom = that.board[rowIndex + 1][colIndex];
      }

      if (current === top || current === bottom || current === left || current === right)
        isLost = false;
    });
  });
  this.lost = isLost;
};

Game2048.prototype._gameFinished = function () {
  return this.won || this.lost;
};

Game2048.prototype._updateScore = function(value) {
  this.score += value;

  if (value === 2048) {
    this.won = true;
  }
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
