import { Tileset } from "./types/types";

export function remove(tileset: Tileset, what: string | number) {
    for (let x: number = 0; x < tileset.length; x++) {
        for (let y: number = 0; y < tileset[x].length; y++) {
            if (tileset[x][y] == what) tileset[x][y] = 0
        }
    }
}

export function removeClassName(what: string | number) {
    document.querySelectorAll('.' + what).forEach(seeker => seeker.classList.remove(what.toString()))
}
