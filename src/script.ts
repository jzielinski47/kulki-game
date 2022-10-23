
import { display, renderDefaultBalls, renderTileset } from "./gameRenderer.js"
import { Settings, Tileset } from "./types/types"

const app: HTMLDivElement = document.querySelector('#app')
const colors: string[] = ['#FA6B5D', '#F79C53', '#EFC95E', '#76BD6D', '#59AAA4', '#9F82C4', '#C482BD']

const defaultSettings: Settings = {
    width: 9,
    height: 9,
    defaultObstacles: 3,
    defaultSeeker: 'S',
    defaulWaypoint: 'W',
    defaultObstacleMark: '#',
}

const tileset: Tileset = renderTileset(defaultSettings.width, defaultSettings.height)
const balls: Tileset = renderTileset(defaultSettings.width, defaultSettings.height)
renderDefaultBalls(tileset, balls, defaultSettings, colors)

app.append(display(tileset, balls, defaultSettings))