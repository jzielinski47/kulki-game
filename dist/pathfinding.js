import { defaultSettings } from "./script.js";
export function remove(tileset, what) {
    for (let x = 0; x < tileset.length; x++) {
        for (let y = 0; y < tileset[x].length; y++) {
            if (tileset[x][y] == what) {
                switch (what) {
                    case defaultSettings.defaultSeeker:
                        tileset[x][y] = defaultSettings.defaultObstacleMark;
                        break;
                    default: tileset[x][y] = 0;
                }
            }
        }
    }
}
export function clearNums(tileset) {
    for (let x = 0; x < tileset.length; x++) {
        for (let y = 0; y < tileset[x].length; y++) {
            if (tileset[x][y] != defaultSettings.defaultSeeker && tileset[x][y] != defaultSettings.defaulWaypoint && tileset[x][y] != defaultSettings.defaultObstacleMark) {
                tileset[x][y] = 0;
            }
        }
    }
}
export function removeClassName(what) {
    document.querySelectorAll('.' + what).forEach(seeker => seeker.classList.remove(what.toString()));
}
