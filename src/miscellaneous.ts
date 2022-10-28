import { Settings, Tileset } from "./types/types";

export function getRandomInt(max: number) {
    return Math.floor(Math.random() * max);
}

export function removeClassName(name: string | number) {
    document.querySelectorAll('.' + name).forEach(seeker => seeker.classList.remove(name.toString()))
}

export function removeFromArray(name: string | number, arr: Tileset, moved: boolean, settings: Settings) {
    for (let x: number = 0; x < arr.length; x++) {
        for (let y: number = 0; y < arr[x].length; y++) {
            if (arr[x][y] == name) {
                switch (name) {
                    case settings.defaultSeeker: (moved) ? arr[x][y] = 0 : arr[x][y] = settings.defaultSphere; break;
                    case settings.defaultWaypoint: arr[x][y] = 0; document.querySelector(x + '-' + y).innerHTML = '0'; break;
                    default: arr[x][y] = 0; document.querySelector(x + '-' + y).innerHTML = '0'; break;
                }
            }
        }
    }
}

export function getCords(id: string) {
    return id.split('-').map(item => parseInt(item))
}