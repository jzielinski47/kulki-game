import { clearNums, getCords, getRandomInt, removeClassName, removeFromArray, resetElement } from "./miscellaneous.js";
// Global variables
let seeker, waypoint;
let progressStatus = 0;
let found = false;
let distance;
// Global render functions
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
export function renderDefaultSpheres(tileset, defaultColors, settings, colors) {
    for (let i = 0; i < settings.sphereAmount; i++) {
        const color = colors[Math.floor(Math.random() * colors.length)];
        let cords = [getRandomInt(settings.height), getRandomInt(settings.width)];
        while (tileset[cords[0]][cords[1]] == settings.defaultSphere) {
            cords = [getRandomInt(settings.height), getRandomInt(settings.width)];
        }
        tileset[cords[0]][cords[1]] = settings.defaultSphere;
        defaultColors[cords[0]][cords[1]] = color;
    }
}
export function display(tileset, defaultColors, settings) {
    const container = document.createElement('div');
    container.className = 'tileset';
    for (let x = 0; x < settings.height; x++) {
        for (let y = 0; y < settings.width; y++) {
            let tile = document.createElement('div');
            tile.id = x + '-' + y;
            tile.classList.add('tile');
            // the bug in previous version was the fact that the event listener was attached to the tile and not to the sphere
            // so when the user moved the sphere the event listener was still on the previous tile
            if (tileset[x][y] == settings.defaultSphere) {
                tile.append(renderSphere(x, y, defaultColors[x][y].toString(), tileset, settings));
            }
            else {
                tile.innerHTML = tileset[x][y].toString();
                tile.addEventListener('mouseenter', e => {
                    const target = e.currentTarget;
                    if (progressStatus == 1) {
                        waypoint = getCords(target.id);
                        if (seeker != waypoint)
                            target.classList.add('waypoint');
                    }
                });
                tile.addEventListener('mouseleave', e => {
                    const target = e.currentTarget;
                    if (progressStatus == 1) {
                        if (seeker != waypoint)
                            target.classList.remove('waypoint');
                    }
                });
                tile.addEventListener('click', e => {
                    const target = e.currentTarget;
                    if (progressStatus == 1) {
                        waypoint = getCords(target.id);
                        if (seeker != waypoint) {
                            // target.innerHTML = settings.defaultWaypoint;
                            target.classList.add('waypoint');
                            progressStatus = 2;
                        }
                    }
                    if (progressStatus == 2)
                        searchPath(seeker, waypoint, tileset, settings);
                });
            }
            if (x != 0 && y == 0)
                tile.style.clear = 'both';
            container.append(tile);
        }
    }
    return container;
}
export function renderSphere(x, y, color, tileset, settings) {
    const sphere = document.createElement('div');
    sphere.className = 'sphere';
    sphere.style.background = color;
    // event handler
    sphere.addEventListener('click', e => {
        const target = e.currentTarget;
        if (progressStatus < 2) {
            if (!target.classList.contains('seeker')) {
                removeFromArray(settings.defaultSeeker, tileset, false, settings);
                removeClassName('seeker');
                seeker = [x, y];
                target.classList.add('seeker');
                tileset[x][y] = settings.defaultSeeker;
                progressStatus = 1;
            }
            else {
                removeFromArray(settings.defaultSeeker, tileset, false, settings);
                removeClassName('seeker');
                seeker = [];
                progressStatus = 0;
            }
        }
        console.table(tileset);
    });
    return sphere;
}
// Pathfinder (functions that use global variables)
export function runPathfinder(seeker, waypoint, round, tileset, settings, color) {
    function useSingleTile(offsetX, offsetY) {
        var _a;
        let expression = (_a = tileset[seeker[0] + offsetX]) === null || _a === void 0 ? void 0 : _a[seeker[1] + offsetY];
        if (expression === 0) {
            expression = expression + round;
            tileset[seeker[0] + offsetX][seeker[1] + offsetY] = expression;
            let destination = document.getElementById(`${seeker[0] + offsetX}-${seeker[1] + offsetY}`);
            destination.innerHTML = expression.toString();
            setTimeout(() => runPathfinder([seeker[0] + offsetX, seeker[1] + offsetY], waypoint, round, tileset, settings, color), 1);
            if (seeker[0] + offsetX == waypoint[0] && seeker[1] + offsetY == waypoint[1])
                setTimeout(() => {
                    found = true;
                    distance = tileset[seeker[0] + offsetX][seeker[1] + offsetY];
                    resetElement(destination);
                    destination = document.getElementById(`${seeker[0] + offsetX}-${seeker[1] + offsetY}`);
                    destination.innerHTML = '';
                    destination.append(renderSphere(seeker[0] + offsetX, seeker[1] + offsetY, color, tileset, settings));
                    tileset[seeker[0] + offsetX][seeker[1] + offsetY] = settings.defaultSphere;
                    findBestRoute(seeker[0] + offsetX, seeker[1] + offsetY, distance, tileset);
                    console.table(tileset);
                    setTimeout(() => resetPathfinder(tileset, settings), 1000);
                }, 10);
        }
    }
    if (!found) {
        round++;
        useSingleTile(-1, 0);
        useSingleTile(1, 0);
        useSingleTile(0, -1);
        useSingleTile(0, 1);
        console.log(found);
    }
}
function findBestRoute(waypointX, waypointY, majorDist, tileset) {
    let route = [majorDist];
    function findAvailableTile(wX, wY, offsetX, offsetY, dist) {
        var _a;
        let expression = (_a = tileset[wX + offsetX]) === null || _a === void 0 ? void 0 : _a[wY + offsetY];
        if (!route.includes(expression)) {
            if (expression === dist - 1) {
                route.push(expression);
                document.getElementById(`${wX + offsetX}-${wY + offsetY}`).classList.add('path');
                // console.log(route)
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
function resetPathfinder(tileset, settings) {
    found = false;
    distance = 0;
    progressStatus = 0;
    removeClassName('seeker');
    removeClassName('waypoint');
    removeFromArray(settings.defaultSeeker, tileset, true, settings);
    removeFromArray(settings.defaultWaypoint, tileset, true, settings);
    clearNums(tileset, settings);
    setTimeout(() => removeClassName('path'), 1);
}
export function searchPath(seeker, waypoint, tileset, settings) {
    let round = 0;
    const origin = document.getElementById(`${seeker[0]}-${seeker[1]}`);
    console.log(origin);
    const seekerColor = origin.childNodes[0].style.background;
    origin.removeChild(origin.childNodes[0]);
    origin.addEventListener('mouseenter', e => {
        const target = e.currentTarget;
        if (progressStatus == 1) {
            waypoint = getCords(target.id);
            if (seeker != waypoint)
                target.classList.add('waypoint');
        }
    });
    origin.addEventListener('mouseleave', e => {
        const target = e.currentTarget;
        if (progressStatus == 1) {
            if (seeker != waypoint)
                target.classList.remove('waypoint');
        }
    });
    origin.addEventListener('click', e => {
        const target = e.currentTarget;
        if (progressStatus == 1) {
            waypoint = getCords(target.id);
            if (seeker != waypoint) {
                // target.innerHTML = settings.defaultWaypoint;
                target.classList.add('waypoint');
                progressStatus = 2;
            }
        }
        if (progressStatus == 2)
            searchPath(seeker, waypoint, tileset, settings);
    });
    removeFromArray(settings.defaultSeeker, tileset, true, settings);
    runPathfinder(seeker, waypoint, round, tileset, settings, seekerColor);
}
