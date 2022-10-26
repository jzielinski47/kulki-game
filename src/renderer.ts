import { getRandomInt } from "./miscellaneous.js";
import { Settings, Tileset } from "./types/types";

let seeker: string, waypoint: string
let clicksOnTileset: number = 0;
let found: boolean = false;
let distance: number;

export function renderTileset(width: number, height: number) {
    let tab: Tileset = []

    for (let x: number = 0; x < height; x++) {
        tab[x] = []
        for (let y: number = 0; y < width; y++) {
            tab[x][y] = 0
        }
    }

    return tab;
}

export function renderDefaultSpheres(tileset: Tileset, defaultColors: Tileset, settings: Settings, colors: string[]) {
    for (let i = 0; i < settings.sphereAmount; i++) {
        const color = colors[Math.floor(Math.random() * colors.length)]
        let cords: number[] = [getRandomInt(settings.height), getRandomInt(settings.width)]

        while (tileset[cords[0]][cords[1]] == settings.defaultSphere) {
            cords = [getRandomInt(settings.height), getRandomInt(settings.width)]
        }

        tileset[cords[0]][cords[1]] = settings.defaultSphere
        defaultColors[cords[0]][cords[1]] = color
    }
}

export function display(tileset: Tileset, defaultColors: Tileset, settings: Settings) {

    const container: HTMLDivElement = document.createElement('div')
    container.className = 'tileset'

    for (let x: number = 0; x < settings.height; x++) {
        for (let y: number = 0; y < settings.width; y++) {

            let tile: HTMLDivElement = document.createElement('div')
            tile.id = x + '-' + y;
            tile.classList.add('tile');

            // the bug in previous version was the fact that the event listener was attached to the tile and not to the sphere
            // so when the user moved the sphere the event listener was still on the previous tile

            if (tileset[x][y] == settings.defaultSphere) {
                tile.append(renderSphere(x, y, defaultColors[x][y].toString(), tileset, settings))
            } else {
                tile.innerHTML = tileset[x][y].toString()
            }

            if (x != 0 && y == 0) tile.style.clear = 'both';

            container.append(tile)
        }
    }

    return container
}

export function renderSphere(x: number, y: number, color: string, tileset: Tileset, settings: Settings) {
    const sphere: HTMLDivElement = document.createElement('div')
    sphere.className = 'sphere'
    // sphere.id = x + '=' + y
    sphere.style.background = color

    // event handler
    sphere.addEventListener('click', e => {

    })

    return sphere
}