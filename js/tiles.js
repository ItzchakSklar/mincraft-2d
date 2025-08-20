export function creatworld() {
  const tilesContainer = document.getElementById("tilesGrid");

  const tileType = {
    sky: "sky",
    grass: "grass",
    dirt: "dirt",
    stone: "stone",
    bedrock: "bedrock",
    tree: "tree",
  };

  const breakable = {
    true: "breakable",
    false: "unbreakable",
  };

  const horizonLine = 8;
  const dirtBorder = 27;
  const stoneBorder = 48;

  const columns = 100;
  const rows = 50;

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < columns; col++) {
      const tile = document.createElement("div");
      tile.id = `tile:${row * 100 + col}|`; //Setting a unique ID for each tile according to its row
      tile.classList.add("tile");

      if (row < horizonLine) {
        tile.classList.add(tileType.sky, breakable.false);
      } else if (row === horizonLine) {
        tile.classList.add(tileType.sky, tileType.grass, breakable.true);
      } else if (row < dirtBorder) {
        tile.classList.add(tileType.sky, tileType.dirt, breakable.true);
      } else if (row < stoneBorder) {
        tile.classList.add(tileType.sky, tileType.stone, breakable.true);
      } else {
        tile.classList.add(tileType.bedrock, breakable.false);
      }
      tile.dataset.row = row;
      tile.dataset.col = col;
      tilesContainer.appendChild(tile);
    }
  }
}
