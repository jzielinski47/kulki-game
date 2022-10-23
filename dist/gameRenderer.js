import { getRandomInt } from "./misc.js";
import { remove, removeClassName } from "./pathfinding.js";
import { defaultSettings, tileset } from "./script.js";
let seeker, waypoint;
let clicksOnTileset = 0;
let found = false;
let distance;
const tileSetCopy = tileset;
export function renderTileset(width, height) {
    let tab = [];
    for (let x = 0; x < height; x++) {
        tab[x] = [];
        for (let y = 0; y < width; y++) {
            tab[x][y] = 0;
        }
    }
    return tab;
}
export function renderDefaultBalls(tileset, balls, settings, colors) {
    for (let i = 0; i < settings.defaultObstacles; i++) {
        const color = colors[Math.floor(Math.random() * colors.length)];
        let cords = [getRandomInt(settings.height), getRandomInt(settings.width)];
        while (tileset[cords[0]][cords[1]] == settings.defaultObstacleMark) {
            cords = [getRandomInt(settings.height), getRandomInt(settings.width)];
        }
        tileset[cords[0]][cords[1]] = settings.defaultObstacleMark;
        balls[cords[0]][cords[1]] = color;
    }
    console.table(tileset);
    console.table(balls);
}
export function renderBall(color) {
    const ball = document.createElement('div');
    ball.className = 'ball';
    ball.style.background = color;
    return ball;
}
export function display(tileset, balls, settings) {
    const container = document.createElement('div');
    container.className = 'tileset';
    for (let x = 0; x < settings.height; x++) {
        for (let y = 0; y < settings.width; y++) {
            let tile = document.createElement('div');
            tile.id = x + '-' + y;
            tile.classList.add('tile');
            if (tileset[x][y] == '#') {
                tile.append(renderBall(balls[x][y].toString()));
                tile.addEventListener('click', e => {
                    const target = e.currentTarget;
                    let seekerCords;
                    if (clicksOnTileset < 2) {
                        if (!target.classList.contains('seeker')) {
                            remove(tileset, defaultSettings.defaultSeeker);
                            removeClassName('seeker');
                            seeker = target.id;
                            target.classList.add('seeker');
                            seekerCords = seeker.split('-').map(item => parseInt(item));
                            console.table(tileset);
                            tileset[seekerCords[0]][seekerCords[1]] = defaultSettings.defaultSeeker;
                            clicksOnTileset = 1;
                        }
                        else {
                            remove(tileset, defaultSettings.defaultSeeker);
                            removeClassName('seeker');
                            tileset[seekerCords[0]][seekerCords[1]] = defaultSettings.defaultObstacleMark;
                            seeker = '';
                            clicksOnTileset = 0;
                        }
                        console.table(tileset);
                        console.table(balls);
                    }
                });
            }
            else {
                tile.innerHTML = tileset[x][y].toString();
                tile.addEventListener('mouseenter', e => {
                    const target = e.currentTarget;
                    if (clicksOnTileset == 1) {
                        waypoint = target.id;
                        if (seeker != waypoint) {
                            target.innerHTML = settings.defaulWaypoint;
                            target.classList.add('waypoint');
                            // clicksOnTileset++;
                            // searchPath(seeker, waypoint, tileset)
                        }
                    }
                });
                tile.addEventListener('mouseleave', e => {
                    const target = e.currentTarget;
                    const cords = target.id;
                    if (clicksOnTileset == 1) {
                        target.classList.remove('waypoint');
                        // tileset[parseInt(cords.charAt(0))][parseInt(cords.charAt(2))] = balls[parseInt(cords.charAt(0))][parseInt(cords.charAt(2))]
                        // target.innerHTML = tileSetCopy[parseInt(cords.charAt(0))][parseInt(cords.charAt(2))] as string
                    }
                });
                tile.addEventListener('click', e => {
                    const target = e.currentTarget;
                    if (clicksOnTileset == 1) {
                        waypoint = target.id;
                        if (seeker != waypoint) {
                            target.innerHTML = settings.defaulWaypoint;
                            target.classList.add('waypoint');
                            clicksOnTileset = 2;
                        }
                    }
                    if (clicksOnTileset == 2)
                        searchPath(seeker, waypoint, tileset);
                });
            }
            // tile.onclick = handleClick;
            if (x != 0 && y == 0)
                tile.style.clear = 'both';
            container.append(tile);
        }
    }
    return container;
}
export function searchPath(seeker, waypoint, tileset) {
    const currentStartingPoint = seeker.split('-').map(item => parseInt(item));
    const currentWaypoint = waypoint.split('-').map(item => parseInt(item));
    // console.log(currentStartingPoint, currentWaypoint);
    let round = 0;
    exploitSurrounding(tileset, currentStartingPoint, currentWaypoint, round, defaultSettings);
}
export function exploitSurrounding(tileset, seeker, finish, round, settings) {
    function useSingleTile(offsetX, offsetY) {
        var _a;
        let expression = (_a = tileset[seeker[0] + offsetX]) === null || _a === void 0 ? void 0 : _a[seeker[1] + offsetY];
        if (expression != undefined && expression != settings.defaultObstacleMark && expression != settings.defaultSeeker) {
            if (expression == 0 && expression.toString() != settings.defaulWaypoint && expression.toString() != '#') {
                // console.log(expression, round)
                expression = expression + round;
                tileset[seeker[0] + offsetX][seeker[1] + offsetY] = expression;
                // console.log(expression)
                document.getElementById(`${seeker[0] + offsetX}-${seeker[1] + offsetY}`).innerHTML = expression.toString();
                setTimeout(() => exploitSurrounding(tileset, [seeker[0] + offsetX, seeker[1] + offsetY], finish, round, defaultSettings), 1);
                if (seeker[0] + offsetX == finish[0] && seeker[1] + offsetY == finish[1])
                    setTimeout(() => {
                        found = true;
                        distance = tileset[seeker[0] + offsetX][seeker[1] + offsetY];
                        tileset[seeker[0] + offsetX][seeker[1] + offsetY] = settings.defaulWaypoint;
                        document.getElementById(`${seeker[0] + offsetX}-${seeker[1] + offsetY}`).innerHTML = settings.defaulWaypoint;
                        findBestRoute(seeker[0] + offsetX, seeker[1] + offsetY, distance);
                    }, 100);
            }
        }
    }
    if (!found) {
        round++;
        useSingleTile(-1, 0);
        useSingleTile(1, 0);
        useSingleTile(0, -1);
        useSingleTile(0, 1);
    }
}
function findBestRoute(waypointX, waypointY, majorDist) {
    let route = [majorDist];
    function findAvailableTile(wX, wY, offsetX, offsetY, dist) {
        var _a;
        let expression = (_a = tileset[wX + offsetX]) === null || _a === void 0 ? void 0 : _a[wY + offsetY];
        if (!route.includes(expression)) {
            if (expression === dist - 1) {
                route.push(expression);
                document.getElementById(`${wX + offsetX}-${wY + offsetY}`).classList.add('path');
                console.log(route);
                findAvailableTile(wX + offsetX, wY + offsetY, -1, 0, dist - 1);
                findAvailableTile(wX + offsetX, wY + offsetY, 1, 0, dist - 1);
                findAvailableTile(wX + offsetX, wY + offsetY, 0, -1, dist - 1);
                findAvailableTile(wX + offsetX, wY + offsetY, 0, 1, dist - 1);
            }
        }
    }
    findAvailableTile(waypointX, waypointY, -1, 0, majorDist);
    findAvailableTile(waypointX, waypointY, 1, 0, majorDist);
    findAvailableTile(waypointX, waypointY, 0, -1, majorDist);
    findAvailableTile(waypointX, waypointY, 0, 1, majorDist);
}
