import { tileHoverHandler, tileResetHandler, tileClickHandler } from "./pathfinderScripts";
import { Tileset, Settings } from "./types/types";

/**
 * 
 * @param max - maksymalna liczba do losowania
 * @returns losowy numer z przedzialu (0 do max)
 */

export function getRandomInt(max: number) {
    return Math.floor(Math.random() * max);
}

/**
 * 
 * @param x - parametr X (koordynaty)
 * @param y - parametr Y (koordynaty)
 * @param tileset - główna tablica dwuwymiarowa przechowująca dane o pozycji kulek
 * @param settings - globalne ustawienia dla gry przechowujące standardowe wartości
 * @returns false jesli nie moze sie ruszyc w zadna ze stron; true jesli jest chociaz jedna droga;
 */

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

/**
 * 
 * @param name - co usunac
 * @param arr - z jakiego arraya (u nas to Tileset)
 * @param moved - czy kulka sie przesunela
 * @param settings - globalne ustawienia
 * 
 * funckcja usuwa z arraya wszystkie pola o takiej wartosci
 */

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

/**
 * 
 * @param name - nazwa klasy
 * 
 * funkcja usuwa wszystkie nazwy klas .name
 */

export function removeClassName(name: string | number) {
    document.querySelectorAll('.' + name).forEach(seeker => seeker.classList.remove(name.toString()))
}

/**
 * 
 * @param id - id elementu
 * @returns koordynaty z id (tablica numerow): number[]
 */

export function getCords(id: string) {
    return id.split('-').map(item => parseInt(item))
}

/**
 * 
 * @param tileset - główna tablica dwuwymiarowa przechowująca dane o pozycji kulek
 * @param settings - globalne ustawienia dla gry przechowujące standardowe wartości
 * 
 * funckja czysci wszystkie pola numeryczne na zero w tilesecie
 */

export function clearNums(tileset: Tileset, settings: Settings) {
    for (let x: number = 0; x < tileset.length; x++) {
        for (let y: number = 0; y < tileset[x].length; y++) {
            if (tileset[x][y] != settings.defaultSeeker && tileset[x][y] != settings.defaultWaypoint && tileset[x][y] != settings.defaultSphere) {
                tileset[x][y] = 0
            }
        }
    }
}

/**
 * 
 * @param element - element HTML
 * funckcja resetuje wszystkie event listenery na elemencie zwracajac nowy element w miejsce starego (kopie)
 */

export function resetElement(element: HTMLElement) {
    const factoryDefault = element.cloneNode(true);
    element.replaceWith(factoryDefault)
}

/**
 * 
 * @param tileset - główna tablica dwuwymiarowa przechowująca dane o pozycji kulek
 * @param settings - globalne ustawienia dla gry przechowujące standardowe wartości
 * 
 * funckja zwraca event listenery do pól
 */

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

