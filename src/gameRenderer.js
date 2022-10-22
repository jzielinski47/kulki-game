"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.display = exports.renderBall = exports.renderDefaultBalls = exports.renderTileset = void 0;
const misc_js_1 = require("./misc.js");
function renderTileset(width, height) {
    let tab = [];
    for (let x = 0; x < height; x++) {
        tab[x] = [];
        for (let y = 0; y < width; y++) {
            tab[x][y] = 0;
        }
    }
    return tab;
}
exports.renderTileset = renderTileset;
function renderDefaultBalls(tileset, settings, colors) {
    for (let i = 0; i < settings.defaultObstacles; i++) {
        const color = colors[Math.floor(Math.random() * colors.length)];
        let cords = [(0, misc_js_1.getRandomInt)(settings.height), (0, misc_js_1.getRandomInt)(settings.width)];
        const destination = tileset[cords[0]][cords[1]].toString();
        while (destination.startsWith('#')) {
            cords = [(0, misc_js_1.getRandomInt)(settings.height), (0, misc_js_1.getRandomInt)(settings.width)];
        }
        tileset[cords[0]][cords[1]] = color;
    }
    console.table(tileset);
}
exports.renderDefaultBalls = renderDefaultBalls;
function renderBall(color) {
    const ball = document.createElement('div');
    ball.className = 'ball';
    ball.style.background = color;
    return ball;
}
exports.renderBall = renderBall;
function display(tileset, settings) {
    const container = document.createElement('div');
    container.className = 'tileset';
    for (let x = 0; x < settings.height; x++) {
        for (let y = 0; y < settings.width; y++) {
            let tile = document.createElement('div');
            tile.id = x + '-' + y;
            tile.classList.add('tile');
            tile.innerHTML = tileset[x][y].toString();
            // tile.onclick = handleClick;
            if (x != 0 && y == 0)
                tile.style.clear = 'both';
            container.append(tile);
        }
    }
    return container;
}
exports.display = display;
