export class InventoryManager {
  constructor(gameState) {
    this.gs = gameState;
  }

  add(tileType, amount = 1) {
    if (!TILES[tileType]?.placeable) return; // לא אוספים "sky" וכד'
    this.gs.inventory[tileType] = (this.gs.inventory[tileType] || 0) + amount;
    if (!this.gs.selectedInventoryTile) this.gs.selectedInventoryTile = tileType;
  }

  canPlace(tileType) {
    return (this.gs.inventory[tileType] || 0) > 0 && TILES[tileType]?.placeable;
  }

  consume(tileType, amount = 1) {
    if (!this.canPlace(tileType)) return false;
    this.gs.inventory[tileType] -= amount;
    if (this.gs.inventory[tileType] <= 0) {
      delete this.gs.inventory[tileType];
      // אם נגמר מהסלוט הנבחר — נבחר אוטומטית הבא
      if (this.gs.selectedInventoryTile === tileType) {
        const keys = Object.keys(this.gs.inventory);
        this.gs.selectedInventoryTile = keys[0] || null;
      }
    }
    return true;
  }
}