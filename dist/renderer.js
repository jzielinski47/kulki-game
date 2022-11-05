import { getRandomInt } from "./misc.js";
import { renderSphere } from "./objectRenderer.js";
import { tileClickHandler, tileHoverHandler, tileResetHandler } from "./pathfinderScripts.js";
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
export function renderDefaultSpheres(tileset, settings) {
    for (let i = 0; i < settings.sphereAmount; i++) {
        let cords = [getRandomInt(settings.height), getRandomInt(settings.width)];
        while (tileset[cords[0]][cords[1]] == settings.defaultSphere) {
            cords = [getRandomInt(settings.height), getRandomInt(settings.width)];
        }
        tileset[cords[0]][cords[1]] = settings.defaultSphere;
    }
}
export function display(tileset, settings, colors) {
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
                tile.append(renderSphere(x, y, colors[Math.floor(Math.random() * colors.length)], tileset, settings));
            }
            else {
                // tile.innerHTML = tileset[x][y].toString()
                tile.addEventListener('mouseenter', e => tileHoverHandler(e, tileset, settings));
                tile.addEventListener('mouseleave', tileResetHandler);
                tile.addEventListener('click', e => tileClickHandler(e, tileset, settings));
            }
            if (x != 0 && y == 0)
                tile.style.clear = 'both';
            container.append(tile);
        }
    }
    return container;
}
