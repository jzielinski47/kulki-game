import { getRandomInt } from "./misc.js";
import { Settings, Tileset } from "./types/types";

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

export function renderDefaultBalls(tileset: Tileset, balls: Tileset, settings: Settings, colors: string[]) {
    for (let i = 0; i < settings.defaultObstacles; i++) {
        const color = colors[Math.floor(Math.random() * colors.length)]
        let cords: number[] = [getRandomInt(settings.height), getRandomInt(settings.width)]

        while (tileset[cords[0]][cords[1]] == settings.defaultObstacleMark) {
            cords = [getRandomInt(settings.height), getRandomInt(settings.width)]
        }

        tileset[cords[0]][cords[1]] = settings.defaultObstacleMark
        balls[cords[0]][cords[1]] = color
    }
    console.table(tileset)
    console.table(balls)
}

export function renderBall(color: string) {
    const ball: HTMLDivElement = document.createElement('div')
    ball.className = 'ball'
    ball.style.background = color
    return ball
}

export function display(tileset: Tileset, balls: Tileset, settings: Settings) {
    const container: HTMLDivElement = document.createElement('div')
    container.className = 'tileset'
    for (let x: number = 0; x < settings.height; x++) {
        for (let y: number = 0; y < settings.width; y++) {

            let tile: HTMLDivElement = document.createElement('div')
            tile.id = x + '-' + y;
            tile.classList.add('tile');
            if (tileset[x][y] == '#') {
                tile.append(renderBall(balls[x][y].toString()))
                tile.onclick = () => console.log('a')
            } else {
                tile.innerHTML = tileset[x][y].toString()
                tile.onclick = () => console.log('b')
            }



            // tile.onclick = handleClick;

            if (x != 0 && y == 0) tile.style.clear = 'both';

            container.append(tile)
        }
    }

    return container
}

