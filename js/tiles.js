const tilesContainer = document.getElementById("tilesGrid");

const columns = 100;
const rows = 50;

const tileType = {
    sky: "sky",
    grass: "grass",
    dirt: "dirt",
    stone: "stone",
    bedrock: "bedrock"
}

for (let row = 0; row < rows; row++) {
    for (let col = 0; col < columns; col++) {
        const tile = document.createElement("div");
        tile.id = row * 100 + col; //Setting a unique ID for each tile according to its row
        tile.classList.add("tile");
        
        if (row < 6) {
            tile.classList.add(tileType.sky);
        } else if (row === 6) {
            tile.classList.add(tileType.grass);
        } else if (row < 27) {
            tile.classList.add(tileType.dirt);
        } else if (row < 45) {
            tile.classList.add(tileType.stone);
        } else {
            tile.classList.add(tileType.bedrock);
        }
        
        tilesContainer.appendChild(tile);
    }
}

