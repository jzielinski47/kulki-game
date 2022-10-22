import { getRandomInt } from "./misc.js";
import { Settings, Tileset } from "./types/types";

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

export function renderDefaultBalls(tileset: Tileset, settings: Settings, colors: string[]) {
    for (let i = 0; i < settings.defaultObstacles; i++) {
        const color = colors[Math.floor(Math.random() * colors.length)]
        let cords: number[] = [getRandomInt(settings.height), getRandomInt(settings.width)]

        const destination: string = tileset[cords[0]][cords[1]].toString()

        while (destination.startsWith('#')) {
            cords = [getRandomInt(settings.height), getRandomInt(settings.width)]
        }

        tileset[cords[0]][cords[1]] = color
    }
    console.table(tileset)
}

export function renderBall(color: string) {
    const ball: HTMLDivElement = document.createElement('div')
    ball.className = 'ball'
    ball.style.background = color
    return ball
}

export function display(tileset: Tileset, settings: Settings) {
    const container: HTMLDivElement = document.createElement('div')
    container.className = 'tileset'
    for (let x: number = 0; x < settings.height; x++) {
        for (let y: number = 0; y < settings.width; y++) {

            let tile: HTMLDivElement = document.createElement('div')
            tile.id = x + '-' + y;
            tile.classList.add('tile');
            tile.innerHTML = tileset[x][y].toString()

            // tile.onclick = handleClick;

            if (x != 0 && y == 0) tile.style.clear = 'both';

            container.append(tile)
        }
    }

    return container
}
