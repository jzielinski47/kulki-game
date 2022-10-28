import { clearNums, getCords, getRandomInt, removeClassName, removeFromArray, resetElement } from "./miscellaneous.js";
import { Settings, Tileset } from "./types/types";

// Global variables

let seeker: number[], waypoint: number[]
let seekerColor: string
let progressStatus: number = 0;
let found: boolean = false;
let distance: number;

// Global render functions

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
                tile.addEventListener('mouseenter', e => {
                    const target: HTMLDivElement = e.currentTarget as HTMLDivElement
                    if (progressStatus == 1) {
                        waypoint = getCords(target.id);
                        if (seeker != waypoint) target.classList.add('waypoint')
                    }
                })
                tile.addEventListener('mouseleave', e => {
                    const target: HTMLDivElement = e.currentTarget as HTMLDivElement
                    if (progressStatus == 1) {
                        if (seeker != waypoint) target.classList.remove('waypoint')
                    }
                })
                tile.addEventListener('click', e => {
                    const target: HTMLDivElement = e.currentTarget as HTMLDivElement
                    if (progressStatus == 1) {
                        waypoint = getCords(target.id);
                        if (seeker != waypoint) {
                            // target.innerHTML = settings.defaultWaypoint;
                            target.classList.add('waypoint')
                            progressStatus = 2;
                        }
                    }

                    if (progressStatus == 2) searchPath(seeker, waypoint, tileset, settings)
                })
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
    sphere.style.background = color

    // event handler
    sphere.addEventListener('click', e => {

        const target = e.currentTarget as HTMLDivElement

        if (progressStatus < 2) {

            if (!target.classList.contains('seeker')) {
                removeFromArray(settings.defaultSeeker, tileset, false, settings)
                removeClassName('seeker')

                seeker = [x, y]
                target.classList.add('seeker')
                tileset[x][y] = settings.defaultSeeker
                seekerColor = target.style.background as string

                progressStatus = 1;
            } else {
                removeFromArray(settings.defaultSeeker, tileset, false, settings)
                removeClassName('seeker')

                seeker = []
                progressStatus = 0
            }
        }

        console.table(tileset)

    })

    return sphere
}

// Pathfinder (functions that use global variables)

export function runPathfinder(seeker: number[], waypoint: number[], round: number, tileset: Tileset, settings: Settings, color: string) {

    function useSingleTile(offsetX: number, offsetY: number) {
        let expression: string | number = tileset[seeker[0] + offsetX]?.[seeker[1] + offsetY]

        if (expression === 0) {
            expression = expression as number + round

            tileset[seeker[0] + offsetX][seeker[1] + offsetY] = expression
            let destination = document.getElementById(`${seeker[0] + offsetX}-${seeker[1] + offsetY}`)

            destination.innerHTML = expression.toString()

            setTimeout(() => runPathfinder([seeker[0] + offsetX, seeker[1] + offsetY], waypoint, round, tileset, settings, color), 1)

            if (seeker[0] + offsetX == waypoint[0] && seeker[1] + offsetY == waypoint[1]) setTimeout(() => {
                found = true;
                distance = tileset[seeker[0] + offsetX][seeker[1] + offsetY] as number

                resetElement(destination)
                destination = document.getElementById(`${seeker[0] + offsetX}-${seeker[1] + offsetY}`)

                destination.innerHTML = ''
                destination.append(renderSphere(seeker[0] + offsetX, seeker[1] + offsetY, color, tileset, settings))

                tileset[seeker[0] + offsetX][seeker[1] + offsetY] = settings.defaultSphere
                findBestRoute(seeker[0] + offsetX, seeker[1] + offsetY, distance, tileset)
                console.table(tileset)
                setTimeout(() => resetPathfinder(tileset, settings), 1000);

            }, 10)
        }

    }

    if (!found) {
        round++;
        useSingleTile(-1, 0)
        useSingleTile(1, 0)
        useSingleTile(0, -1)
        useSingleTile(0, 1)
        console.log(found)
    }

}

function findBestRoute(waypointX: number, waypointY: number, majorDist: number, tileset: Tileset) {

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

function resetPathfinder(tileset: Tileset, settings: Settings) {
    found = false;
    distance = 0
    progressStatus = 0

    removeClassName('seeker')
    removeClassName('waypoint')
    removeFromArray(settings.defaultSeeker, tileset, true, settings)
    removeFromArray(settings.defaultWaypoint, tileset, true, settings)

    clearNums(tileset, settings)

    setTimeout(() => removeClassName('path'), 1);

}

export function searchPath(seeker: number[], waypoint: number[], tileset: Tileset, settings: Settings) {

    let round: number = 0
    const origin: HTMLDivElement = document.getElementById(`${seeker[0]}-${seeker[1]}`) as HTMLDivElement

    console.log(origin)

    origin.removeChild(origin.childNodes[0])
    origin.addEventListener('mouseenter', e => {
        const target: HTMLDivElement = e.currentTarget as HTMLDivElement
        if (progressStatus == 1) {
            waypoint = getCords(target.id);
            if (seeker != waypoint) target.classList.add('waypoint')
        }
    })
    origin.addEventListener('mouseleave', e => {
        const target: HTMLDivElement = e.currentTarget as HTMLDivElement
        if (progressStatus == 1) {
            if (seeker != waypoint) target.classList.remove('waypoint')
        }
    })
    origin.addEventListener('click', e => {
        const target: HTMLDivElement = e.currentTarget as HTMLDivElement
        if (progressStatus == 1) {
            waypoint = getCords(target.id);
            if (seeker != waypoint) {
                // target.innerHTML = settings.defaultWaypoint;
                target.classList.add('waypoint')
                progressStatus = 2;
            }
        }

        if (progressStatus == 2) searchPath(seeker, waypoint, tileset, settings)
    })
    removeFromArray(settings.defaultSeeker, tileset, true, settings)

    runPathfinder(seeker, waypoint, round, tileset, settings, seekerColor)

}
