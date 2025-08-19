// =======================
// Inventory Manager
// =======================

import { TILES } from "./tiles.js";

/**
 * Manages inventory: add items, consume items, check availability.
 */
export class InventoryManager {
  constructor(gameState) {
    this.gs = gameState;
  }

  /**
   * Add a tile to inventory.
   */
  add(tileType, amount = 1) {
    if (!TILES[tileType]?.placeable) return; // skip unplaceable tiles
    this.gs.inventory[tileType] = (this.gs.inventory[tileType] || 0) + amount;
    if (!this.gs.selectedInventoryTile) this.gs.selectedInventoryTile = tileType;
  }

  /**
   * Check if the tile can be placed (exists in inventory and is placeable).
   */
  canPlace(tileType) {
    return (this.gs.inventory[tileType] || 0) > 0 && TILES[tileType]?.placeable;
  }

  /**
   * Consume one or more tiles from inventory.
   */
  consume(tileType, amount = 1) {
    if (!this.canPlace(tileType)) return false;
    this.gs.inventory[tileType] -= amount;
    if (this.gs.inventory[tileType] <= 0) {
      delete this.gs.inventory[tileType];
      if (this.gs.selectedInventoryTile === tileType) {
        const keys = Object.keys(this.gs.inventory);
        this.gs.selectedInventoryTile = keys[0] || null;
      }
    }
    return true;
  }
}