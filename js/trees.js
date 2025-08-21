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


function generateTrees(horizonLineS) {
  const horizonLine = horizonLineS;

  const grassRow = horizonLine - 1;
  const grassCells = document.querySelectorAll(`[data-row="${grassRow}"]`);
  const numOfTrees = Math.ceil((Math.random() * grassCells.length) / 2);
  const columns = grassCells.length;
  const rows = 100

  for (let i = 0; i < numOfTrees; i++) {
    const baseCol = Math.floor(Math.random() * grassCells.length);
    console.log("tree in", baseCol);

    let isEmptyPlace = true;
    for (let k = baseCol - 3; k <= baseCol + 3; k++) {
      if (k < 0 || k >= columns) continue;

      const tempTile = document.querySelector(
        `[data-row="${grassRow}"][data-col="${k}"]`
      );
      if (tempTile.getAttribute("tileType") == "wood"){
        isEmptyPlace = false;
        break;
      };

    }
    if (!isEmptyPlace) continue;

    creatTree(baseCol);
  }

  function creatTree(ground) {
    const baseRow = horizonLine - 1; // שורת הקרקע (horizonLine)
    const baseCol = ground;
    const maxHigh = 5;
    const minHigh = 3;

    const high = Math.floor(Math.random() * (maxHigh - minHigh + 1)) + minHigh;
    for (let i = 0; i < high; i++) {
      const r = baseRow - i;
      const c = baseCol;

      if (r < 0 || r >= rows || c < 0 || c >= columns) continue;

      const cell = document.querySelector(`[data-row="${r}"][data-col="${c}"]`);
      if (!cell) continue;


      // cell.removeAttribute("");
      cell.setAttribute("tileType", "wood");
      cell.setAttribute("breakable",true)

    }
    generateLeaves(ground, high);
  }

  function generateLeaves(col, topRow) {
    let high = horizonLine - topRow;
    for (let dy = 0; dy < 2; dy++) {
      high = high - dy;
      for (let dx = -3; dx <= 3; dx++) {
        const r = high;
        const c = col + dx;
        if (r < 0 || r >= rows || c < 0 || c >= columns) continue;

        const cell = document.querySelector(
          `[data-row="${r}"][data-col="${c}"]`
        );
        if (!cell) continue;

        if (cell.getAttribute("tileType") == "wood") continue; // לא מוחק גזע
        cell.setAttribute("tileType", "leave");
        cell.setAttribute("breakable",true)

      }
    }
    for (let dy = 0; dy < 2; dy++) {
      high = high - 1;
      for (let dx = -2; dx <= 2; dx++) {
        const r = high;
        const c = col + dx;
        if (r < 0 || r >= rows || c < 0 || c >= columns) continue;

        const cell = document.querySelector(
          `[data-row="${r}"][data-col="${c}"]`
        );
        if (!cell) continue;

        if (cell.getAttribute("tileType") == "wood") continue; // לא מוחק גזע
        cell.setAttribute("tileType", "leave");
        cell.setAttribute("breakable",true)

      }
    }
    for (let dy = 0; dy < 2; dy++) {
      high = high - 1;
      for (let dx = -1; dx <= 1; dx++) {
        const r = high;
        const c = col + dx;
        if (r < 0 || r >= rows || c < 0 || c >= columns) continue;

        const cell = document.querySelector(
          `[data-row="${r}"][data-col="${c}"]`
        );
        if (!cell) continue;

        if (cell.getAttribute("tileType") == "wood") continue; // לא מוחק גזע
        cell.setAttribute("tileType", "leave");
        cell.setAttribute("breakable",true)

      }
    }
  }
}
export { generateTrees };
