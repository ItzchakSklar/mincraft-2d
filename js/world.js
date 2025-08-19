// =======================
// World Controller
// =======================

import { TILES } from "./tiles.js";

/**
 * Controls harvesting and placing blocks in the world.
 */
export class WorldController {
  constructor(gameState, inventory) {
    this.gs = gameState;
    this.inv = inventory;
  }

  /**
   * Try harvesting a block at (row, col).
   * Only works if correct tool is selected.
   */
  tryHarvest(row, col) {
    const type = this.gs.world[row][col];
    const requiredTool = TILES[type]?.tool;

    // Special case: dirt/grass with shovel
    const shovelOk = (type === "dirt" || type === "grass") && this.gs.selectedTool === "shovel";

    if ((requiredTool && this.gs.selectedTool === requiredTool) || shovelOk) {
      this.gs.world[row][col] = "sky";
      this.inv.add(type, 1);
      return true;
    }
    return false;
  }

  /**
   * Try placing a block at (row, col).
   * Works only if tool is "place" and cell is empty.
   */
  tryPlace(row, col) {
    if (this.gs.selectedTool !== "place") return false;
    const type = this.gs.selectedInventoryTile;
    if (!type) return false;
    if (this.gs.world[row][col] !== "sky") return false;
    if (!this.inv.consume(type, 1)) return false;

    this.gs.world[row][col] = type;
    return true;
  }
}