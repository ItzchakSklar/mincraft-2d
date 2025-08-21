import { saveGame, loadGame, resetGame } from "./state.js";
import { makeGrid } from "./tiles.js";
import { tilesContainer } from "./globalObj.js";

export function startNewGame() {
    resetGame();
    const grid = makeGrid();
    saveGame(grid);
}

export function continueGame() {
    const game = loadGame();
    
    if (!game) {
        //do this (alert);
    } else {
        tilesContainer.innerHTML = game;
    }
}