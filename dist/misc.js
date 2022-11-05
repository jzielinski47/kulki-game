import { tileHoverHandler, tileResetHandler, tileClickHandler } from "./pathfinder.js";
export function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}
export function checkAll4Neighbours(x, y, tileset, settings) {
    let survey = [];
    function chcekSingleNeighbour(offsetX, offsetY) {
        var _a;
        if (((_a = tileset[x + offsetX]) === null || _a === void 0 ? void 0 : _a[y + offsetY]) !== 0)
            return false;
    }
    survey.push(chcekSingleNeighbour(-1, 0));
    survey.push(chcekSingleNeighbour(1, 0));
    survey.push(chcekSingleNeighbour(0, -1));
    survey.push(chcekSingleNeighbour(0, 1));
    return !(survey.every(direction => direction === false));
}
export function removeFromArray(name, arr, moved, settings) {
    for (let x = 0; x < arr.length; x++) {
        for (let y = 0; y < arr[x].length; y++) {
            if (arr[x][y] == name) {
                switch (name) {
                    case settings.defaultSeeker:
                        arr[x][y] = (moved) ? 0 : settings.defaultSphere;
                        break;
                    default:
                        arr[x][y] = 0;
                        document.querySelector(x + '-' + y).innerHTML = '0';
                        break;
                }
            }
        }
    }
}
export function removeClassName(name) {
    document.querySelectorAll('.' + name).forEach(seeker => seeker.classList.remove(name.toString()));
}
export function getCords(id) {
    return id.split('-').map(item => parseInt(item));
}
export function clearNums(tileset, settings) {
    for (let x = 0; x < tileset.length; x++) {
        for (let y = 0; y < tileset[x].length; y++) {
            if (tileset[x][y] != settings.defaultSeeker && tileset[x][y] != settings.defaultWaypoint && tileset[x][y] != settings.defaultSphere) {
                tileset[x][y] = 0;
            }
        }
    }
}
export function resetElement(element) {
    const factoryDefault = element.cloneNode(true);
    element.replaceWith(factoryDefault);
}
export function returnEventListeners(tileset, settings) {
    for (let x = 0; x < tileset.length; x++) {
        for (let y = 0; y < tileset[x].length; y++) {
            if (tileset[x][y] == 0) {
                const origin = document.getElementById(x + '-' + y);
                origin.addEventListener('mouseenter', e => tileHoverHandler(e, tileset, settings));
                origin.addEventListener('mouseleave', tileResetHandler);
                origin.addEventListener('click', e => tileClickHandler(e, tileset, settings));
            }
        }
    }
}
