import { removeFromArray } from "./miscellaneous.js"
import { runPathfinder } from "./renderer.js"
import { Settings, Tileset } from "./types/types"

// Common Search Path Initial Function Reference

export function searchPath(seeker: number[], waypoint: number[], tileset: Tileset, settings: Settings) {

    let round: number = 0
    const origin: HTMLDivElement = document.getElementById(`${seeker[0]}-${seeker[1]}`) as HTMLDivElement

    const seekerColor: string = (origin.childNodes[0] as HTMLDivElement).style.background as string

    origin.removeChild(origin.childNodes[0])
    removeFromArray(settings.defaultSeeker, tileset, true, settings)

    runPathfinder(seeker, waypoint, round, tileset, settings, seekerColor)

}
