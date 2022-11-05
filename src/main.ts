import { renderUpcoming } from "./pathfinder.js"
import { display, placeDefaultSpheres, renderTileset } from "./renderer.js"
import { Settings, Tileset } from "./types/types"

const app: HTMLDivElement = document.querySelector('#app')
export const colors: string[] = ['#FA6B5D', '#F79C53', '#EFC95E', '#76BD6D', '#59AAA4', '#9F82C4', '#C482BD']

const settings: Settings = {
    width: 9,
    height: 9,
    sphereAmount: 3,
    defaultSeeker: 'S',
    defaultWaypoint: 'W',
    defaultSphere: '#'
}

const tileset: Tileset = renderTileset(settings.width, settings.height)

placeDefaultSpheres(tileset, settings)
app.append(display(tileset, settings, colors))

console.table(tileset)
