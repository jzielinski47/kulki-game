// Actual Code
const app = document.querySelector('#app');
const settings = {
    width: 9,
    height: 9,
    obstacles: 5,
    defaultSeeker: 'S',
    defaulWaypoint: 'W',
    defaultObstacle: 'X',
};
const tileset = renderPlayField();
let seeker, waypoint;
let clicksOnTileset = 0;
let found = false;
let distance;
function renderPlayField() {
    let tab = [];
    for (let x = 0; x < settings.height; x++) {
        tab[x] = [];
        for (let y = 0; y < settings.width; y++) {
            tab[x][y] = 0;
        }
    }
    return tab;
}
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}
function renderObstacles(amount) {
    for (let i = 0; i < amount; i++) {
        let cords = [getRandomInt(settings.height), getRandomInt(settings.width)];
        while (tileset[cords[0]][cords[1]] == settings.defaultObstacle) {
            cords = [getRandomInt(settings.height), getRandomInt(settings.width)];
        }
        // console.log(tileset[cords[0]][cords[1]], cords)
        tileset[cords[0]][cords[1]] = settings.defaultObstacle;
    }
}
function display(tab) {
    const container = document.createElement('div');
    container.className = 'tileset';
    for (let x = 0; x < settings.height; x++) {
        for (let y = 0; y < settings.width; y++) {
            let tile = document.createElement('div');
            tile.id = x + '-' + y;
            tile.classList.add('tile');
            tile.innerHTML = tab[x][y].toString();
            tile.onclick = handleClick;
            if (x != 0 && y == 0)
                tile.style.clear = 'both';
            container.append(tile);
        }
    }
    return container;
}
const handleClick = (e) => {
    const target = e.target;
    // console.log(target)
    let currentCords = e.target.id.split('-').map(cord => parseInt(cord));
    let seekerCords;
    if (tileset[currentCords[0]][currentCords[1]] != settings.defaultObstacle) {
        switch (clicksOnTileset) {
            case 0:
                seeker = target.id;
                target.innerHTML = settings.defaultSeeker;
                target.classList.add('seeker');
                seekerCords = seeker.split('-').map(item => parseInt(item));
                tileset[seekerCords[0]][seekerCords[1]] = settings.defaultSeeker;
                clicksOnTileset++;
                break;
            case 1:
                waypoint = target.id;
                if (seeker != waypoint) {
                    target.innerHTML = settings.defaulWaypoint;
                    target.classList.add('waypoint');
                    clicksOnTileset++;
                }
                break;
            default:
                clicksOnTileset++;
        }
    }
    if (clicksOnTileset == 2)
        searchPath(seeker, waypoint, tileset);
};
function searchPath(seeker, waypoint, tab) {
    const currentStartingPoint = seeker.split('-').map(item => parseInt(item));
    const currentWaypoint = waypoint.split('-').map(item => parseInt(item));
    // console.log(currentStartingPoint, currentWaypoint);
    let round = 0;
    exploitSurrounding(currentStartingPoint, currentWaypoint, round);
}
function exploitSurrounding(seeker, finish, round) {
    function useSingleTile(offsetX, offsetY) {
        var _a;
        let expression = (_a = tileset[seeker[0] + offsetX]) === null || _a === void 0 ? void 0 : _a[seeker[1] + offsetY];
        if (expression != undefined && expression != settings.defaultObstacle && expression != settings.defaultSeeker) {
            if (expression == 0 && expression.toString() != settings.defaulWaypoint) {
                // console.log(expression, round)
                expression = expression + round;
                tileset[seeker[0] + offsetX][seeker[1] + offsetY] = expression;
                // console.log(expression)
                document.getElementById(`${seeker[0] + offsetX}-${seeker[1] + offsetY}`).innerHTML = expression.toString();
                setTimeout(() => exploitSurrounding([seeker[0] + offsetX, seeker[1] + offsetY], finish, round), 1);
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
renderObstacles(settings.obstacles);
console.table(tileset);
app.append(display(tileset));
export {};
