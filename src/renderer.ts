import { getRandomInt } from "./misc";
import { renderSphere } from "./objectRenderer";
import { tileClickHandler, tileHoverHandler, tileResetHandler } from "./pathfinderScripts";
import { Tileset, Settings } from "./types/types";

/**
 * @param width - szerokosc planszy
 * @param height - wysokosc planszy
 * @returns tab: Tileset - tablica dwuwymiarowa [na ten moment posiada wyłącznie same zera]
 */

export function renderTileset(width: number, height: number): Tileset {
    let tab: Tileset = []

    for (let x: number = 0; x < height; x++) {
        tab[x] = []
        for (let y: number = 0; y < width; y++) {
            tab[x][y] = 0
        }
    }

    return tab;
}

/**
 * @param tileset - główna tablica dwuwymiarowa przechowująca dane o pozycji kulek
 * @param settings - globalne ustawienia dla gry przechowujące standardowe wartości
 * 
 * @todo rednerDefaultSpheres - funkcja odpowiedzialna za wyrenderowanie (podanej z settings) ilości kulek na planszy na początku. [W naszym przypadku są to 3 kulki]
 */

export function renderDefaultSpheres(tileset: Tileset, settings: Settings) {

    for (let i = 0; i < settings.sphereAmount; i++) {

        let cords: number[] = [getRandomInt(settings.height), getRandomInt(settings.width)]

        while (tileset[cords[0]][cords[1]] == settings.defaultSphere) {
            cords = [getRandomInt(settings.height), getRandomInt(settings.width)]
        }

        tileset[cords[0]][cords[1]] = settings.defaultSphere

    }
}

/**
 * 
 * @param tileset 
 * @param settings 
 * @param colors 
 * @returns HTMLDivElement // funckja zwaraca container, który zawiera wyrenderowaną planszez kulkami oraz zwykłymi płytkami z eventlistenerami; tutaj znajdują się odniesienia do funkcji wykonywanych po kliknięciu na kulke lub pustą płytkę
 */

export function display(tileset: Tileset, settings: Settings, colors: string[]) {
    const container: HTMLDivElement = document.createElement('div')
    container.className = 'tileset'

    for (let x: number = 0; x < settings.height; x++) {
        for (let y: number = 0; y < settings.width; y++) {

            let tile: HTMLDivElement = document.createElement('div')
            tile.id = x + '-' + y;
            tile.classList.add('tile');

            // the bug in previous version was the fact that the event listener was attached to the tile and not to the sphere
            // so when the user moved the sphere the event listener was still on the previous tile

            if (tileset[x][y] == settings.defaultSphere) {
                tile.append(renderSphere(x, y, colors[Math.floor(Math.random() * colors.length)], tileset, settings))
            } else {
                // tile.innerHTML = tileset[x][y].toString()

                tile.addEventListener('mouseenter', e => tileHoverHandler(e, tileset, settings))
                tile.addEventListener('mouseleave', tileResetHandler)
                tile.addEventListener('click', e => tileClickHandler(e, tileset, settings));
            }

            if (x != 0 && y == 0) tile.style.clear = 'both';
            container.append(tile)

        }
    }

    return container
}