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
