import { defaultSettings } from "./gameRenderer.js";
export function remove(tileset, what, moved) {
    for (let x = 0; x < tileset.length; x++) {
        for (let y = 0; y < tileset[x].length; y++) {
            if (tileset[x][y] == what) {
                switch (what) {
                    case defaultSettings.defaultSeeker:
                        if (moved) {
                            tileset[x][y] = 0;
                        }
                        else {
                            tileset[x][y] = defaultSettings.defaultObstacleMark;
                        }
                        break;
                    case defaultSettings.defaulWaypoint:
                        tileset[x][y] = 0;
                        document.querySelector(x + '-' + y).innerHTML = '0';
                        break;
                    default:
                        tileset[x][y] = 0;
                        document.querySelector(x + '-' + y).innerHTML = '0';
                        break;
                }
            }
        }
    }
}
export function removOnFound(tileset, what) {
    for (let x = 0; x < tileset.length; x++) {
        for (let y = 0; y < tileset[x].length; y++) {
            if (tileset[x][y] == what) {
                switch (what) {
                    case defaultSettings.defaultSeeker:
                        tileset[x][y] = 0;
                        document.querySelector(x + '-' + y).innerHTML = '0';
                        break;
                    case defaultSettings.defaulWaypoint:
                        tileset[x][y] = defaultSettings.defaultObstacleMark;
                        break;
                    default:
                        tileset[x][y] = 0;
                        document.querySelector(x + '-' + y).innerHTML = '0';
                        break;
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
