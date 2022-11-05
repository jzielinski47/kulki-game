import { Sphere } from "./Sphere.js";
import { clearNums, getCords, getRandomInt, removeClassName, removeFromArray, resetElement } from "./miscellaneous.js";
import { colors } from "./script.js";
import { Settings, Tileset } from "./types/types";

// Global variables

let localSphereMemory: string[] = []

let seeker: number[], waypoint: number[];
let seekerColor: string;
let progressStatus: number = 0;
let found: boolean = false;
let distance: number;

// Default render
renderUpcoming(3, colors);

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
                        if (checkNeighbours(waypoint[0], waypoint[1], tileset, settings)) {
                            if (seeker != waypoint) {
                                // target.innerHTML = settings.defaultWaypoint;
                                target.classList.add('waypoint')
                                progressStatus = 2;
                            }
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
    const model: Sphere = new Sphere(color)
    const sphere = model.render()

    // event handler
    sphere.addEventListener('click', e => {

        const target = e.currentTarget as HTMLDivElement

        if (progressStatus < 2) {

            if (!target.classList.contains('seeker')) {

                if (checkNeighbours(x, y, tileset, settings)) {
                    removeFromArray(settings.defaultSeeker, tileset, false, settings)
                    removeClassName('seeker')

                    // console.warn(checkNeighbours(x, y, tileset, settings));


                    seeker = [x, y]
                    target.classList.add('seeker')
                    tileset[x][y] = settings.defaultSeeker
                    seekerColor = target.style.background as string

                    progressStatus = 1;
                }

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

                destination.replaceWith(destination.cloneNode(true))
                destination = document.getElementById(`${seeker[0] + offsetX}-${seeker[1] + offsetY}`)

                destination.innerHTML = ''
                destination.append(renderSphere(seeker[0] + offsetX, seeker[1] + offsetY, color, tileset, settings))

                tileset[seeker[0] + offsetX][seeker[1] + offsetY] = settings.defaultSphere
                findBestRoute(seeker[0] + offsetX, seeker[1] + offsetY, distance, tileset)
                console.table(tileset)
                setTimeout(() => {
                    resetPathfinder(tileset, settings);
                    renderUpcoming(3, colors);
                }, 1000);


            }, 10)
        }

    }

    if (!found) {
        round++;
        useSingleTile(-1, 0)
        useSingleTile(1, 0)
        useSingleTile(0, -1)
        useSingleTile(0, 1)
        // console.log(found)
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

    document.querySelector('#upcoming').innerHTML = ''
    appendToTileset(tileset, settings)
    localSphereMemory = []

    clearNums(tileset, settings)
    returnEventListeners(tileset, settings)

    setTimeout(() => removeClassName('path'), 1);



}

export function searchPath(seeker: number[], waypoint: number[], tileset: Tileset, settings: Settings) {

    let round: number = 0
    const origin: HTMLDivElement = document.getElementById(`${seeker[0]}-${seeker[1]}`) as HTMLDivElement

    // console.log(origin)

    // origin.removeChild(origin.childNodes[0])
    origin.innerHTML = ''

    removeFromArray(settings.defaultSeeker, tileset, true, settings)

    runPathfinder(seeker, waypoint, round, tileset, settings, seekerColor)

}

export function returnEventListeners(tileset: Tileset, settings: Settings) {
    for (let x: number = 0; x < tileset.length; x++) {
        for (let y: number = 0; y < tileset[x].length; y++) {
            if (tileset[x][y] == 0) {
                const origin = document.getElementById(x + '-' + y)

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
                        if (checkNeighbours(waypoint[0], waypoint[1], tileset, settings)) {
                            if (seeker != waypoint) {
                                // target.innerHTML = settings.defaultWaypoint;
                                target.classList.add('waypoint')
                                progressStatus = 2;
                            }
                        }

                    }

                    if (progressStatus == 2) searchPath(seeker, waypoint, tileset, settings)
                })
            }
        }
    }
}

export function checkNeighbours(x: number, y: number, tileset: Tileset, settings: Settings) {

    let possibleSelection: boolean = true
    let survey: boolean[] = []

    function chcekSingleNeighbour(offsetX: number, offsetY: number) {
        if (tileset[x + offsetX]?.[y + offsetY] !== 0) {
            // console.log(tileset[x + offsetX]?.[y + offsetY])
            return false
        }
    }

    survey.push(chcekSingleNeighbour(-1, 0))
    survey.push(chcekSingleNeighbour(1, 0))
    survey.push(chcekSingleNeighbour(0, -1))
    survey.push(chcekSingleNeighbour(0, 1))

    if (survey.every(direction => direction === false)) {
        possibleSelection = false
    } else {
        possibleSelection = true
    }

    return possibleSelection

}

export function renderUpcoming(amount: number, colors: string[]) {

    const upcomingSpheres: HTMLDivElement = document.querySelector('#upcoming')

    for (let i = 0; i < amount; i++) {

        const color = colors[Math.floor(Math.random() * colors.length)]
        const model: Sphere = new Sphere(color)
        const sphere = model.render()
        sphere.classList.add('default')

        localSphereMemory.push(color)
        upcomingSpheres.append(sphere)

    }

    console.log(localSphereMemory)

}

export function appendToTileset(tileset: Tileset, settings: Settings) {
    for (let i = 0; i < localSphereMemory.length; i++) {
        const model = new Sphere(localSphereMemory[i])
        const sphere = model.render()

        let cords: number[] = [getRandomInt(settings.height), getRandomInt(settings.width)]

        // console.warn('d')
        while (tileset[cords[0]][cords[1]] == settings.defaultSphere) {
            cords = [getRandomInt(settings.height), getRandomInt(settings.width)]
        }

        sphere.addEventListener('click', e => {

            const target = e.currentTarget as HTMLDivElement

            if (progressStatus < 2) {

                if (!target.classList.contains('seeker')) {

                    if (checkNeighbours(cords[0], cords[1], tileset, settings)) {
                        removeFromArray(settings.defaultSeeker, tileset, false, settings)
                        removeClassName('seeker')

                        // console.warn(checkNeighbours(x, y, tileset, settings));

                        seeker = cords
                        target.classList.add('seeker')
                        tileset[cords[0]][cords[1]] = settings.defaultSeeker
                        seekerColor = target.style.background as string

                        progressStatus = 1;
                    }

                } else {
                    removeFromArray(settings.defaultSeeker, tileset, false, settings)
                    removeClassName('seeker')

                    seeker = []
                    progressStatus = 0
                }
            }

        })

        tileset[cords[0]][cords[1]] = settings.defaultSphere

        const destination = document.getElementById(cords[0] + '-' + cords[1])
        destination.replaceWith(destination.cloneNode(false))
        destination.innerHTML = ''
        document.getElementById(cords[0] + '-' + cords[1]).append(sphere)
        // console.table(tileset)
    }

}
