// =======================
// Tiles and Tools Config
// =======================

/**
 * Tile definitions.
 * Each tile has optional rules: if it is placeable and if a specific tool is required.
 */
export const TILES = {
  sky:   { placeable: false },
  dirt:  { placeable: true, tool: "shovel" },
  tree:  { placeable: true, tool: "axe" },
  rock:  { placeable: true, tool: "pickaxe" }
};

/**
 * Available tools in the game.
 */
export const TOOLS = ["axe", "pickaxe", "shovel", "place"];