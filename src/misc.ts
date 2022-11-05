import { tileHoverHandler, tileResetHandler, tileClickHandler } from "./pathfinderScripts.js";
import { Tileset, Settings } from "./types/types";

export function getRandomInt(max: number) {
    return Math.floor(Math.random() * max);
}

export function checkAll4Neighbours(x: number, y: number, tileset: Tileset, settings: Settings) {

    let survey: boolean[] = []

    function chcekSingleNeighbour(offsetX: number, offsetY: number) {
        if (tileset[x + offsetX]?.[y + offsetY] !== 0) return false
    }

    survey.push(chcekSingleNeighbour(-1, 0))
    survey.push(chcekSingleNeighbour(1, 0))
    survey.push(chcekSingleNeighbour(0, -1))
    survey.push(chcekSingleNeighbour(0, 1))

    return !(survey.every(direction => direction === false))

}

export function removeFromArray(name: string | number, arr: Tileset, moved: boolean, settings: Settings) {

    for (let x: number = 0; x < arr.length; x++) {
        for (let y: number = 0; y < arr[x].length; y++) {

            if (arr[x][y] == name) {
                switch (name) {
                    case settings.defaultSeeker: arr[x][y] = (moved) ? 0 : settings.defaultSphere; break;
                    default: arr[x][y] = 0; document.querySelector(x + '-' + y).innerHTML = '0'; break;
                }
            }

        }
    }

}

export function removeClassName(name: string | number) {
    document.querySelectorAll('.' + name).forEach(seeker => seeker.classList.remove(name.toString()))
}

export function getCords(id: string) {
    return id.split('-').map(item => parseInt(item))
}

export function clearNums(tileset: Tileset, settings: Settings) {
    for (let x: number = 0; x < tileset.length; x++) {
        for (let y: number = 0; y < tileset[x].length; y++) {
            if (tileset[x][y] != settings.defaultSeeker && tileset[x][y] != settings.defaultWaypoint && tileset[x][y] != settings.defaultSphere) {
                tileset[x][y] = 0
            }
        }
    }
}

export function resetElement(element: HTMLElement) {
    const factoryDefault = element.cloneNode(true);
    element.replaceWith(factoryDefault)
}

export function returnEventListeners(tileset: Tileset, settings: Settings) {
    for (let x: number = 0; x < tileset.length; x++) {
        for (let y: number = 0; y < tileset[x].length; y++) {
            if (tileset[x][y] == 0) {
                const origin = document.getElementById(x + '-' + y)

                origin.addEventListener('mouseenter', e => tileHoverHandler(e, tileset, settings))
                origin.addEventListener('mouseleave', tileResetHandler)
                origin.addEventListener('click', e => tileClickHandler(e, tileset, settings));
            }
        }
    }
}

