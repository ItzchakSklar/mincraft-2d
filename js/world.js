import { creatworld } from "./tiles.js";
import { generateTrees } from "./trees.js";


function startgame(horizonLine) {
  creatworld(horizonLine);
  generateTrees(horizonLine);
}

export { startgame };