import { creatworld } from "./tiles.js";
import { generateTrees } from "./trees.js";
function startgame() {
  creatworld();
  generateTrees();
}

export { startgame };