import { renderPlayField } from "./gameRenderer"
import { Settings, Tileset } from "./types/types"

const app: HTMLDivElement = document.querySelector('#app')
const colors: string[] = ['#FA6B5D', '#F79C53', '#EFC95E', '#76BD6D', '#59AAA4', '#9F82C4', '#C482BD']

const defaultSettings: Settings = {
    width: 9,
    height: 9,
    balls: 2,
    defaultSeeker: 'S',
    defaulWaypoint: 'W',
    defaultBall: 'X',
}

const tileset: Tileset = renderPlayField(defaultSettings.width, defaultSettings.height)