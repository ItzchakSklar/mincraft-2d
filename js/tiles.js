// import { createRandomWorld } from  "./main.js";

// const MAP = createRandomWorld();
// ====== 1) מגדיר מפה ======
// כל שורה במפה היא Array של מחרוזות שמות הבלוקים
// const MAP = [
//   // דוגמה קטנה, תחליף במפה שלך (אפשר גם 50x100)
//   ["sky","sky","sky","sky","sky","sky","sky","sky","sky","sky"],
//   ["sky","sky","sky","sky","sky","sky","sky","sky","sky","sky"],
//   ["sky","sky","sky","grass","grass","sky","sky","sky","sky","sky"],
//   ["sky","sky","dirt","dirt","dirt","sky","sky","sky","sky","sky"],
//   ["sky","stone","stone","dirt","dirt","stone","stone","sky","sky","sky"],
//   ["bedrock","bedrock","bedrock","bedrock","bedrock","bedrock","bedrock","bedrock","bedrock","bedrock"]
// ];

// ====== 2) רנדור לפי MAP ======
// const tilesContainer = document.getElementById("tilesGrid");



// let world = [];
// for (i = 0; i < 50; i++) {
//   let world_row = []
//   for (k = 0; k < 100; k++) {
//     world_row.push("sky");
//   }
//   world.push(world_row);
// }
// const MAP = world
// console.log(MAP)
// const rows = MAP.length;
// const columns = MAP[0].length;
// console.log("rows",rows);
// console.log("columns",columns);


// for (let row = 0; row < rows; row++) {
//   for (let col = 0; col < columns; col++) {
//     const tile = document.createElement("div");
//     tile.id = row * columns + col; // עדיף להשתמש ב-columns במקום 100 קבוע
//     tile.classList.add("tile");

//     const type = MAP[row][col]; // קוראים את סוג הבלוק מהמפה
//     if (type == "sky") {
//       tile.classList.add(tileType.sky);
//     } else if (type == "grass") {
//       tile.classList.add(tileType.grass);
//     } else if (type == "dirt") {
//       tile.classList.add(tileType.dirt);
//     } else if (type == "stone") {
//       tile.classList.add(tileType.stone);
//     } else if (type == "bedrock") {
//       tile.classList.add(tileType.bedrock);
//     } else {
//       tile.classList.add(tileType.sky);
//     }
//     tilesContainer.appendChild(tile);
//   }
// }

const tilesContainer = document.getElementById("tilesGrid");

const columns = 100;
const rows = 50;

const tileType = {
    sky: "sky",
    grass: "grass",
    dirt: "dirt",
    stone: "stone",
    bedrock: "bedrock"
}

const breakable = {
    true: "breakable",
    false: "unbreakable"
}

for (let row = 0; row < rows; row++) {
    for (let col = 0; col < columns; col++) {
        const tile = document.createElement("div");
        tile.id = `tile:${row * 100 + col}|`; //Setting a unique ID for each tile according to its row
        tile.classList.add("tile");

        if (row < 6) {
            tile.classList.add(tileType.sky, breakable.false);
        } else if (row === 6) {
            tile.classList.add(tileType.sky, tileType.grass, breakable.true);
        } else if (row < 27) {
            tile.classList.add(tileType.sky, tileType.dirt, breakable.true);
        } else if (row < 48) {
            tile.classList.add(tileType.sky, tileType.stone, breakable.true);
        } else {
            tile.classList.add(tileType.bedrock, breakable.false);
        }

        tilesContainer.appendChild(tile);
    }
}