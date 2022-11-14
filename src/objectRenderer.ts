import { sphereClickHandler } from "./pathfinderScripts";
import { Sphere } from "./Sphere";
import { Settings, Tileset } from "./types/types";

/**
 * 
 * @param x - pozycja x
 * @param y - pozycja y
 * @param color - kolor tworzonej kulki
 * @param tileset - główna tablica dwuwymiarowa przechowująca dane o pozycji kulek
 * @param settings - globalne ustawienia dla gry przechowujące standardowe wartości
 * @returns sphere jako HTMLDivElement - zwraca gotową kulkę stworzoną z pomocą klasy Sphere z odpowiednim event listenerem
 */
export function renderSphere(x: number, y: number, color: string, tileset: Tileset, settings: Settings) {
    const model: Sphere = new Sphere(color)
    const sphere = model.render()

    sphere.addEventListener('click', e => sphereClickHandler(e, x, y, tileset, settings))

    return sphere;
}