export function saveGame(state) {
    localStorage.setItem("tilesContainer", state.innerHTML);
}

export function loadGame() {
    const storedGame = localStorage.getItem("tilesContainer");
    if (storedGame) {
        return storedGame;
    }
    return null;
}

export function resetGame() {
    localStorage.removeItem("tilesContainer");
}