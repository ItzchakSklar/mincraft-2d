import { putTile, breakTile } from "./tiles.js";
import { toolType, blockType, tileType } from "./globalObj.js";
import { saveGame } from "./state.js";
import { tilesContainer } from "./globalObj.js";

tilesContainer.addEventListener("click", (event) => {
    if (event.target.getAttribute("tileType") === tileType.sky) {
        putTile(blockType.dirt, event.target)//temp
    }
    else {
        breakTile(toolType.diamondPickaxe, event.target);//temp
    }
    saveGame(tilesContainer);
})