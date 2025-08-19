const STORAGE_KEY = "minecraft2d_state_v1";

export class GameState {
  constructor(initialWorld, options = {}) {
    this.world = initialWorld;               // [][] of tileType strings
    this.inventory = {};                     // { tileType: number }
    this.selectedTool = "axe";
    this.selectedInventoryTile = null;
    this.theme = options.theme || "default";
    this.width = initialWorld[0].length;
    this.height = initialWorld.length;
  }

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
      } catch { /* נופלים ליצירת חדש */ }
    }
    return new GameState(createInitialWorldFn());
  }

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

  reset(createInitialWorldFn) {
    localStorage.removeItem(STORAGE_KEY);
    const fresh = new GameState(createInitialWorldFn());
    Object.assign(this, fresh);
  }
}