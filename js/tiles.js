function creatworld() {
  const tileType = {
    sky: "sky",
    grass: "grass",
    dirt: "dirt",
    stone: "stone",
    bedrock: "bedrock",
  };

  const blockType = {
    grass: "grass",
    dirt: "dirt",
    stone: "stone",
  };

  const toolType = {
    diamondPickaxe: { breakableTypes: ["stone"] },
    diamondAxe: { breakableTypes: ["wood"] },
    shovel: { breakableTypes: ["grass", "dirt"] },
    shears: { breakableTypes: ["leaves"] },
  };

  const breakable = {
    true: "true",
    false: "false",
  };
  localStorage.removeItem("tilesContainer");
  const horizonLine = 10;
  const dirtBorder = 27;
  const stoneBorder = 48;

  const columns = 100;
  const rows = 50;

  const tilesContainer = document.getElementById("tilesGrid");

  if (localStorage.getItem("tilesContainer")) {
    tilesContainer.innerHTML = localStorage.getItem("tilesContainer");
  } else {
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < columns; col++) {
        const tile = document.createElement("div");
        tile.id = `tile:${row * 100 + col}`; //Setting a unique ID for each tile according to its row
        tile.classList.add("tile");

        if (row < horizonLine) {
          tile.setAttribute("tileType", tileType.sky);
          tile.setAttribute("breakable", breakable.false);
        } else if (row === horizonLine) {
          tile.setAttribute("tileType", tileType.grass);
          tile.setAttribute("breakable", breakable.true);
        } else if (row < dirtBorder) {
          tile.setAttribute("tileType", tileType.dirt);
          tile.setAttribute("breakable", breakable.true);
        } else if (row < stoneBorder) {
          tile.setAttribute("tileType", tileType.stone);
          tile.setAttribute("breakable", breakable.true);
        } else {
          tile.setAttribute("tileType", tileType.bedrock);
          tile.setAttribute("breakable", breakable.false);
        }
        tile.dataset.row = row;
        tile.dataset.col = col;
        tilesContainer.appendChild(tile);
      }
      localStorage.setItem("tilesContainer", tilesContainer.innerHTML);
    }
  }

  let selectedBlock = blockType.grass;

  tilesContainer.addEventListener("click", (event) => {
    if (event.target.getAttribute("tileType") === tileType.sky) {
      putTile(selectedBlock, event.target); //temp
    } else {
      breakTile(toolType.diamondPickaxe, event.target); //temp
    }

    localStorage.setItem("tilesContainer", tilesContainer.innerHTML);
  });

  function breakTile(tool, tile) {
    const breakTypes = tool.breakableTypes;
    const tileType = tile.getAttribute("tileType");

    if (breakTypes.includes(tileType)) {
      tile.setAttribute("tileType", "sky");
      tile.setAttribute("breakable", breakable.false);
    }
  }

  function putTile(block, tile) {
    tile.setAttribute("tileType", block);
  }
}

export { creatworld };
