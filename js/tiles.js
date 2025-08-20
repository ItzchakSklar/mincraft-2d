const tilesContainer = document.getElementById("tilesGrid");

const columns = 100;
const rows = 50;

const HorizonLine = 8;

const tileType = {
  sky: "sky",
  grass: "grass",
  dirt: "dirt",
  stone: "stone",
  bedrock: "bedrock",
};

const breakable = {
  true: "breakable",
  false: "unbreakable",
};

for (let row = 0; row < rows; row++) {
  for (let col = 0; col < columns; col++) {
    const tile = document.createElement("div");
    tile.id = `tile:${row * 100 + col}|`; //Setting a unique ID for each tile according to its row
    tile.classList.add("tile");

    if (row < HorizonLine) {
      tile.classList.add(tileType.sky, breakable.false);
    } else if (row === HorizonLine) {
      tile.classList.add(tileType.sky, tileType.grass, breakable.true);
    } else if (row < 27) {
      tile.classList.add(tileType.sky, tileType.dirt, breakable.true);
    } else if (row < 48) {
      tile.classList.add(tileType.sky, tileType.stone, breakable.true);
    } else {
      tile.classList.add(tileType.bedrock, breakable.false);
    }
    tile.dataset.row = row;
    tile.dataset.col = col;

    tilesContainer.appendChild(tile);
  }
}


const tile = document.querySelector(`[data-row="${HorizonLine-1}"][data-col="6"]`);
tile.classList.remove();
tile.classList.add("stone");