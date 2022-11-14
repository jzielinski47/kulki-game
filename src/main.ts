import { renderTileset, renderDefaultSpheres, display } from "./renderer"
import { colors } from "./setup"
import { Settings, Tileset } from "./types/types"

/**
 * @moudle main jest głównym plikiem rozruchowym dla całej aplikacji
 * @param app - główny div, w którym renderowana jest plansza
 * @param settings - ustawienia, używane do przypisania dynamicznie wartości. Po zmianie tych ustawień gra dalej będzie działać w innej konfiguracji.
 */
const app: HTMLDivElement = document.querySelector('#app')

/**
 * @param settings - główny element aplikacji
 */
const settings: Settings = {
    width: 9,
    height: 9,
    sphereAmount: 3,
    defaultSeeker: 'S',
    defaultWaypoint: 'W',
    defaultSphere: '#',
}

/**
 * wywołanie rendera iniciującego tworzenie planszy
 *  @param tileset - główna tablica dwuwymiarowa przechowująca dane o pozycji kulek
 */

const tileset: Tileset = renderTileset(settings.width, settings.height)

/**
 * @param tileset - główna tablica dwuwymiarowa przechowująca dane o pozycji kulek
 * @param settings - globalne ustawienia dla gry przechowujące standardowe wartości
 */

renderDefaultSpheres(tileset, settings)
app.append(display(tileset, settings, colors))

console.table(tileset)
