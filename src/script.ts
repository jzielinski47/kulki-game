import { Settings, Tileset } from "./types/types";

// Actual Code

const app: HTMLDivElement = document.querySelector('#app');

const settings: Settings = {
    width: 9,
    height: 9,
    obstacles: 5,
    defaultSeeker: 'S',
    defaulWaypoint: 'W',
    defaultObstacle: 'X',
}

const tileset: Tileset = renderPlayField()
let seeker: string, waypoint: string

let clicksOnTileset: number = 0;
let found: boolean = false;
let distance: number;

function renderPlayField() {
    let tab = []

    for (let x: number = 0; x < settings.height; x++) {
        tab[x] = []
        for (let y: number = 0; y < settings.width; y++) {
            tab[x][y] = 0
        }
    }

    return tab;
}

function getRandomInt(max: number) {
    return Math.floor(Math.random() * max);
}

function renderObstacles(amount: number) {
    for (let i = 0; i < amount; i++) {
        let cords: number[] = [getRandomInt(settings.height), getRandomInt(settings.width)]

        while (tileset[cords[0]][cords[1]] == settings.defaultObstacle) {
            cords = [getRandomInt(settings.height), getRandomInt(settings.width)]
        }

        // console.log(tileset[cords[0]][cords[1]], cords)
        tileset[cords[0]][cords[1]] = settings.defaultObstacle

    }

}

function display(tab: Tileset) {
    const container: HTMLDivElement = document.createElement('div')
    container.className = 'tileset'
    for (let x: number = 0; x < settings.height; x++) {
        for (let y: number = 0; y < settings.width; y++) {

            let tile: HTMLDivElement = document.createElement('div')
            tile.id = x + '-' + y;
            tile.classList.add('tile');
            tile.innerHTML = tab[x][y].toString()

            tile.onclick = handleClick;

            if (x != 0 && y == 0) tile.style.clear = 'both';

            container.append(tile)
        }
    }

    return container

}

const handleClick = (e: MouseEvent) => {
    const target = e.target as HTMLDivElement
    // console.log(target)

    let currentCords = (e.target as HTMLDivElement).id.split('-').map(cord => parseInt(cord))
    let seekerCords: number[]

    if (tileset[currentCords[0]][currentCords[1]] != settings.defaultObstacle) {
        switch (clicksOnTileset) {
            case 0:
                seeker = (target as HTMLDivElement).id;
                target.innerHTML = settings.defaultSeeker;
                target.classList.add('seeker')
                seekerCords = seeker.split('-').map(item => parseInt(item))
                tileset[seekerCords[0]][seekerCords[1]] = settings.defaultSeeker
                clicksOnTileset++;
                break;
            case 1:
                waypoint = (target as HTMLDivElement).id;
                if (seeker != waypoint) {
                    target.innerHTML = settings.defaulWaypoint;
                    target.classList.add('waypoint')
                    clicksOnTileset++;
                }
                break;
            default:
                clicksOnTileset++;

        }
    }

    if (clicksOnTileset == 2) searchPath(seeker, waypoint, tileset)

}

function searchPath(seeker: string, waypoint: string, tab: Tileset) {
    const currentStartingPoint: number[] = seeker.split('-').map(item => parseInt(item))
    const currentWaypoint: number[] = waypoint.split('-').map(item => parseInt(item))

    // console.log(currentStartingPoint, currentWaypoint);

    let round: number = 0
    exploitSurrounding(currentStartingPoint, currentWaypoint, round)

}

function exploitSurrounding(seeker: number[], finish: number[], round: number) {


    function useSingleTile(offsetX: number, offsetY: number) {
        let expression: string | number = tileset[seeker[0] + offsetX]?.[seeker[1] + offsetY]

        if (expression != undefined && expression != settings.defaultObstacle && expression != settings.defaultSeeker) {
            if (expression == 0 && expression.toString() != settings.defaulWaypoint) {
                // console.log(expression, round)

                expression = expression as number + round
                tileset[seeker[0] + offsetX][seeker[1] + offsetY] = expression
                // console.log(expression)
                document.getElementById(`${seeker[0] + offsetX}-${seeker[1] + offsetY}`).innerHTML = expression.toString()

                setTimeout(() => exploitSurrounding([seeker[0] + offsetX, seeker[1] + offsetY], finish, round), 1)

                if (seeker[0] + offsetX == finish[0] && seeker[1] + offsetY == finish[1]) setTimeout(() => {
                    found = true;
                    distance = tileset[seeker[0] + offsetX][seeker[1] + offsetY] as number
                    tileset[seeker[0] + offsetX][seeker[1] + offsetY] = settings.defaulWaypoint
                    document.getElementById(`${seeker[0] + offsetX}-${seeker[1] + offsetY}`).innerHTML = settings.defaulWaypoint
                    findBestRoute(seeker[0] + offsetX, seeker[1] + offsetY, distance)
                }, 100)
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

                console.log(route)

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

renderObstacles(settings.obstacles)
console.table(tileset)
app.append(display(tileset))