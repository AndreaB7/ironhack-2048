var game;

window.onload = function() {
  game = new Game2048();
  console.log("Game initialized");

  renderTiles();
};

// Renders tiles inside the `tile-container`
function renderTiles() {
  // Iterate over game board
  game.board.forEach(function(row, rowIndex) {
    row.forEach(function (cell, collIndex) {
      // If cell has any value
      if (cell) {
        // Create a div with a class `tile` and `val-N`, where N
        // is the value of the current cell. Additionally, add a class
        // `tile-position-N` that transforms it coordinates on the plane
        var tileContainer = document.getElementById("tile-container");
        var newTile       = document.createElement("div");

        newTile.classList  = "tile val-" + cell;
        newTile.classList += " tile-position-" + rowIndex + "-" + collIndex;
        newTile.innerHTML  = (cell);

        // Finally append a div to the `tile-container`
        tileContainer.appendChild(newTile);
      }
    });
  });
}

// Reset tiles
function resetTiles() {
  var tilesContainer = document.getElementById("tile-container");
  var tiles          = tilesContainer.getElementsByClassName("tile");

  // Clean up container by removing every child
  Array.prototype.slice.call(tiles).forEach(function(tile) {
    tilesContainer.removeChild(tile);
  });
}

// Updates game score
function updateScore() {
  var score          = game.score;
  var scoreContainer = document.getElementsByClassName("js-score");

  Array.prototype.slice.call(scoreContainer).forEach(function(span) {
    span.innerHTML = score;
  });
}

// Keydown listener callback to move the game
function moveListeners(event) {
  var keys = [
    37, // Left
    38, // Up
    39, // Right
    40  // Down
  ];

  // Ignore other keys
  if (keys.indexOf(event.keyCode) < 0) return;

  switch (event.keyCode) {
    case 37: game.move("left");  break;
    case 38: game.move("up");    break;
    case 39: game.move("right"); break;
    case 40: game.move("down");  break;
  }

  resetTiles();
  renderTiles();
  updateScore();
}

// Add listener `keydown` on document
document.addEventListener("keydown", moveListeners);
