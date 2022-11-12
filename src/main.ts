import { renderTileset, renderDefaultSpheres, display } from "./renderer"
import { colors } from "./setup"
import { Settings, Tileset } from "./types/types"

const app: HTMLDivElement = document.querySelector('#app')

const settings: Settings = {
    width: 9,
    height: 9,
    sphereAmount: 3,
    defaultSeeker: 'S',
    defaultWaypoint: 'W',
    defaultSphere: '#',
}

// initial render
const tileset: Tileset = renderTileset(settings.width, settings.height)

renderDefaultSpheres(tileset, settings)
app.append(display(tileset, settings, colors))

console.table(tileset)
