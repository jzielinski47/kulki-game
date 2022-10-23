import { getRandomInt } from "./misc.js";
let seeker, waypoint;
let clicksOnTileset = 0;
let found = false;
let distance;
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
                    if (clicksOnTileset == 0) {
                        seeker = target.id;
                        target.classList.add('seeker');
                        seekerCords = seeker.split('-').map(item => parseInt(item));
                        console.log(seeker);
                        tileset[seekerCords[0]][seekerCords[1]] = 'S';
                        clicksOnTileset++;
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
                        }
                    }
                });
                tile.addEventListener('mouseleave', e => {
                    const target = e.currentTarget;
                    if (clicksOnTileset == 1) {
                        target.classList.remove('waypoint');
                        target.innerHTML = '';
                    }
                });
                tile.addEventListener('click', e => {
                    const target = e.currentTarget;
                    if (clicksOnTileset == 1) {
                        waypoint = target.id;
                        if (seeker != waypoint) {
                            target.innerHTML = settings.defaulWaypoint;
                            target.classList.add('waypoint');
                            clicksOnTileset++;
                        }
                    }
                });
            }
            // if (clicksOnTileset == 2) searchPath(seeker, waypoint, tileset)
            // tile.onclick = handleClick;
            if (x != 0 && y == 0)
                tile.style.clear = 'both';
            container.append(tile);
        }
    }
    return container;
}
