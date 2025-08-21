// =======================
// Game State Management
// =======================

const STORAGE_KEY = "minecraft2d_state_v1";

/**
 * GameState handles the world, inventory, and selected tool.
 * It can save and load itself from localStorage.
 */
export class GameState {
  constructor(initialWorld, options = {}) {
    this.world = initialWorld; // 2D array of tile strings
    this.inventory = {};       // { tileType: number }
    this.selectedTool = "axe";
    this.selectedInventoryTile = null;
    this.theme = options.theme || "default";
    this.width = initialWorld[0].length;
    this.height = initialWorld.length;
  }

  /**
   * Load state from localStorage or create a new one.
   */
  static loadOrCreate(createInitialWorldFn) {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      try {
        const parsed = JSON.parse(raw);
        const gs = new GameState(parsed.world, parsed);
        gs.inventory = parsed.inventory || {};
        gs.selectedTool = parsed.selectedTool || "axe";
        gs.selectedInventoryTile = parsed.selectedInventoryTile || null;
        gs.theme = parsed.theme || "default";
        gs.width = parsed.width;
        gs.height = parsed.height;
        return gs;
      } catch { /* fallback to new */ }
    }
    return new GameState(createInitialWorldFn());
  }

  /**
   * Save the current game state to localStorage.
   */
  save() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      world: this.world,
      inventory: this.inventory,
      selectedTool: this.selectedTool,
      selectedInventoryTile: this.selectedInventoryTile,
      theme: this.theme,
      width: this.width,
      height: this.height
    }));
  }

  /**
   * Reset state to a fresh world and clear localStorage.
   */
  reset(createInitialWorldFn) {
    localStorage.removeItem(STORAGE_KEY);
    const fresh = new GameState(createInitialWorldFn());
    Object.assign(this, fresh);
  }
}