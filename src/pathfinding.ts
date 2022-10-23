import { defaultSettings } from "./script.js";
import { Tileset } from "./types/types";

export function remove(tileset: Tileset, what: string | number) {
    for (let x: number = 0; x < tileset.length; x++) {
        for (let y: number = 0; y < tileset[x].length; y++) {
            if (tileset[x][y] == what) {
                switch (what) {
                    case defaultSettings.defaultSeeker: tileset[x][y] = defaultSettings.defaultObstacleMark; break;
                    default: tileset[x][y] = 0
                }
            }
        }
    }
}

export function clearNums(tileset: Tileset) {
    for (let x: number = 0; x < tileset.length; x++) {
        for (let y: number = 0; y < tileset[x].length; y++) {
            if (tileset[x][y] != defaultSettings.defaultSeeker && tileset[x][y] != defaultSettings.defaulWaypoint && tileset[x][y] != defaultSettings.defaultObstacleMark) {
                tileset[x][y] = 0
            }
        }
    }
}



export function removeClassName(what: string | number) {
    document.querySelectorAll('.' + what).forEach(seeker => seeker.classList.remove(what.toString()))
}
