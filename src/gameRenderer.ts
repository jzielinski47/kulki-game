import { getRandomInt } from "./misc.js";
import { clearNums, remove, removeClassName } from "./pathfinding.js";
// import { defaultSettings } from "./script.js";
import { Settings, Tileset } from "./types/types";

export const defaultSettings: Settings = {
    width: 9,
    height: 9,
    defaultObstacles: 6,
    defaultSeeker: 'S',
    defaulWaypoint: 'W',
    defaultObstacleMark: '#',
}

export let tileset: Tileset = renderTileset(defaultSettings.width, defaultSettings.height)
export let balls: Tileset = renderTileset(defaultSettings.width, defaultSettings.height)

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

                    if (clicksOnTileset < 2) {
                        if (!target.classList.contains('seeker')) {
                            remove(tileset, defaultSettings.defaultSeeker, false)
                            removeClassName('seeker')

                            seeker = (target as HTMLDivElement).id;
                            target.classList.add('seeker')
                            seekerCords = seeker.split('-').map(item => parseInt(item))

                            tileset[seekerCords[0]][seekerCords[1]] = defaultSettings.defaultSeeker

                            clicksOnTileset = 1;
                        } else {
                            remove(tileset, defaultSettings.defaultSeeker, false)
                            removeClassName('seeker')

                            seeker = ''
                            clicksOnTileset = 0
                        }

                        console.table(tileset)

                    }
                })
            } else {
                tile.innerHTML = tileset[x][y].toString()
                tile.addEventListener('mouseenter', e => {
                    const target = e.currentTarget as HTMLDivElement
                    if (clicksOnTileset == 1) {
                        waypoint = (target as HTMLDivElement).id;
                        if (seeker != waypoint) {
                            // target.innerHTML = settings.defaulWaypoint;
                            target.classList.add('waypoint')
                            // clicksOnTileset++;

                            // searchPath(seeker, waypoint, tileset)
                        }
                    }
                })
                tile.addEventListener('mouseleave', e => {
                    const target = e.currentTarget as HTMLDivElement
                    const cords = (target as HTMLDivElement).id;
                    if (clicksOnTileset == 1) {
                        target.classList.remove('waypoint')
                        // resetPathfinder()
                        // tileset[parseInt(cords.charAt(0))][parseInt(cords.charAt(2))] = balls[parseInt(cords.charAt(0))][parseInt(cords.charAt(2))]
                        // target.innerHTML = tileSetCopy[parseInt(cords.charAt(0))][parseInt(cords.charAt(2))] as string
                    }

                });
                tile.addEventListener('click', e => {
                    const target = e.currentTarget as HTMLDivElement
                    if (clicksOnTileset == 1) {
                        waypoint = (target as HTMLDivElement).id;
                        if (seeker != waypoint) {
                            target.innerHTML = settings.defaulWaypoint;
                            target.classList.add('waypoint')
                            clicksOnTileset = 2;

                        }
                    }

                    if (clicksOnTileset == 2) searchPath(seeker, waypoint, tileset)
                })
            }



            // tile.onclick = handleClick;

            if (x != 0 && y == 0) tile.style.clear = 'both';

            container.append(tile)
        }
    }

    return container
}


export function searchPath(seeker: string, waypoint: string, tileset: Tileset) {
    const currentStartingPoint: number[] = seeker.split('-').map(item => parseInt(item))
    const currentWaypoint: number[] = waypoint.split('-').map(item => parseInt(item))

    // console.log(currentStartingPoint, currentWaypoint);

    let round: number = 0
    const seekerColor: string = (document.getElementById(seeker).childNodes[0] as HTMLDivElement).style.background as string
    document.getElementById(seeker).removeChild(document.getElementById(seeker).childNodes[0])
    remove(tileset, defaultSettings.defaultSeeker, true)
    console.log(seekerColor)
    exploitSurrounding(tileset, currentStartingPoint, currentWaypoint, round, defaultSettings, seekerColor)

}

export function exploitSurrounding(tileset: Tileset, seeker: number[], finish: number[], round: number, settings: Settings, color: string) {


    function useSingleTile(offsetX: number, offsetY: number) {
        let expression: string | number = tileset[seeker[0] + offsetX]?.[seeker[1] + offsetY]

        if (expression != undefined && expression != settings.defaultObstacleMark && expression != settings.defaultSeeker) {
            if (expression == 0 && expression.toString() != settings.defaulWaypoint && expression.toString() != '#') {
                // console.log(expression, round)

                expression = expression as number + round
                tileset[seeker[0] + offsetX][seeker[1] + offsetY] = expression
                // console.log(expression)
                document.getElementById(`${seeker[0] + offsetX}-${seeker[1] + offsetY}`).innerHTML = expression.toString()

                setTimeout(() => exploitSurrounding(tileset, [seeker[0] + offsetX, seeker[1] + offsetY], finish, round, defaultSettings, color), 1)

                if (seeker[0] + offsetX == finish[0] && seeker[1] + offsetY == finish[1]) setTimeout(() => {
                    found = true;
                    distance = tileset[seeker[0] + offsetX][seeker[1] + offsetY] as number

                    document.getElementById(`${seeker[0] + offsetX}-${seeker[1] + offsetY}`).innerHTML = ''
                    document.getElementById(`${seeker[0] + offsetX}-${seeker[1] + offsetY}`).append(renderBall(color))
                    tileset[seeker[0] + offsetX][seeker[1] + offsetY] = defaultSettings.defaultObstacleMark
                    findBestRoute(seeker[0] + offsetX, seeker[1] + offsetY, distance)
                    setTimeout(() => resetPathfinder(), 1000);

                }, 10)
            }
        }


    }

    if (!found) {
        round++;
        useSingleTile(-1, 0)
        useSingleTile(1, 0)
        useSingleTile(0, -1)
        useSingleTile(0, 1)
    }

}

function findBestRoute(waypointX: number, waypointY: number, majorDist: number) {

    let route = [majorDist]

    function findAvailableTile(wX: number, wY: number, offsetX: number, offsetY: number, dist) {
        let expression: number | string = tileset[wX + offsetX]?.[wY + offsetY]
        if (!route.includes(expression as number)) {
            if (expression as number === dist - 1) {
                route.push(expression as number)

                document.getElementById(`${wX + offsetX}-${wY + offsetY}`).classList.add('path')

                // console.log(route)

                findAvailableTile(wX + offsetX, wY + offsetY, - 1, 0, dist - 1)
                findAvailableTile(wX + offsetX, wY + offsetY, 1, 0, dist - 1)
                findAvailableTile(wX + offsetX, wY + offsetY, 0, -1, dist - 1)
                findAvailableTile(wX + offsetX, wY + offsetY, 0, 1, dist - 1)

            }
        }
    }

    findAvailableTile(waypointX, waypointY, - 1, 0, majorDist)
    findAvailableTile(waypointX, waypointY, 1, 0, majorDist)
    findAvailableTile(waypointX, waypointY, 0, -1, majorDist)
    findAvailableTile(waypointX, waypointY, 0, 1, majorDist)
}

function resetPathfinder() {
    found = false;
    distance = 0
    clicksOnTileset = 0

    remove(tileset, defaultSettings.defaultSeeker, true)
    removeClassName('seeker')
    remove(tileset, defaultSettings.defaulWaypoint, true)
    removeClassName('waypoint')
    clearNums(tileset)

    setTimeout(() => removeClassName('path'), 1);

}