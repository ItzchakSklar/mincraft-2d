import { layers, breakable, tileType, tilesContainer} from "./globalObj.js";


export function breakTile(tool, tile) {
    const breakTypes = tool.breakableTypes;
    const tileType = tile.getAttribute("tileType");

    if (breakTypes.includes(tileType)) {
        tile.setAttribute("tileType", "sky")
        tile.setAttribute("breakable", breakable.false);
    }
}

export function putTile(block, tile) {
    tile.setAttribute("tileType", block);
}

export function makeGrid() {
    const columns = 100;
    const rows = 50;

    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < columns; col++) {
            const tile = document.createElement("div");
            tile.id = `tile:${row * 100 + col}`; //Setting a unique ID for each tile according to its row
            tile.classList.add("tile");

            if (row < layers.horizonLine) {
                tile.setAttribute("tileType", tileType.sky);
                tile.setAttribute("breakable", breakable.false);

            } else if (row === layers.horizonLine) {
                tile.setAttribute("tileType", tileType.grass);
                tile.setAttribute("breakable", breakable.true);

            } else if (row < layers.dirtBorder) {
                tile.setAttribute("tileType", tileType.dirt);
                tile.setAttribute("breakable", breakable.true);

            } else if (row < layers.stoneBorder) {
                tile.setAttribute("tileType", tileType.stone);
                tile.setAttribute("breakable", breakable.true);

            } else {
                tile.setAttribute("tileType", tileType.bedrock);
                tile.setAttribute("breakable", breakable.false);
            }

            tilesContainer.appendChild(tile);
        }
    }
    return tilesContainer;
}