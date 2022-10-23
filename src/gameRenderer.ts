import { getRandomInt } from "./misc.js";
import { defaultSettings } from "./script.js";
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
                tile.addEventListener('click', e => {
                    const target = e.currentTarget as HTMLDivElement

                    let seekerCords: number[]

                    if (clicksOnTileset == 0) {
                        seeker = (target as HTMLDivElement).id;
                        target.classList.add('seeker')
                        seekerCords = seeker.split('-').map(item => parseInt(item))

                        console.log(seeker)
                        tileset[seekerCords[0]][seekerCords[1]] = 'S'
                        clicksOnTileset++;
                    }
                })
            } else {
                tile.innerHTML = tileset[x][y].toString()
                tile.addEventListener('mouseenter', e => {
                    const target = e.currentTarget as HTMLDivElement
                    if (clicksOnTileset == 1) {
                        waypoint = (target as HTMLDivElement).id;
                        if (seeker != waypoint) {
                            target.innerHTML = settings.defaulWaypoint;
                            target.classList.add('waypoint')
                            // clicksOnTileset++;
                        }
                    }
                })
                tile.addEventListener('mouseleave', e => {
                    const target = e.currentTarget as HTMLDivElement
                    if (clicksOnTileset == 1) {
                        target.classList.remove('waypoint')
                        target.innerHTML = ''
                    }
                });
                tile.addEventListener('click', e => {
                    const target = e.currentTarget as HTMLDivElement
                    if (clicksOnTileset == 1) {
                        waypoint = (target as HTMLDivElement).id;
                        if (seeker != waypoint) {
                            target.innerHTML = settings.defaulWaypoint;
                            target.classList.add('waypoint')
                            clicksOnTileset++;
                        }
                    }
                })
            }

            // if (clicksOnTileset == 2) searchPath(seeker, waypoint, tileset)

            // tile.onclick = handleClick;

            if (x != 0 && y == 0) tile.style.clear = 'both';

            container.append(tile)
        }
    }

    return container
}

