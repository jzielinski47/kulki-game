import { getRandomInt } from "./miscellaneous.js";
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
    // sphere.id = x + '=' + y
    sphere.style.background = color;
    // event handler
    sphere.addEventListener('click', e => {
    });
    return sphere;
}
