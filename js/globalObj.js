export const tilesContainer = document.getElementById("tilesGrid");

export const tileType = {
    sky: "sky",
    grass: "grass",
    dirt: "dirt",
    stone: "stone",
    bedrock: "bedrock"
}

export const blockType = {
    grass: "grass",
    dirt: "dirt",
    stone: "stone",
    wood: "wood",
    leave: "leave"
}

export const toolType = {
    diamondPickaxe: { breakableTypes: ["stone"] },
    diamondAxe: { breakableTypes: ["wood"] },
    shovel: { breakableTypes: ["grass", "dirt"] },
    shears: { breakableTypes: ["leave"] }
}

export const breakable = {
    true: "true",
    false: "false"
}

export const layers = {
    horizonLine: 12,
    dirtBorder: 27,
    stoneBorder: 48
}

export const trees ={
    distance: 5
}