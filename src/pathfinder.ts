import { Settings, Tileset } from "./types/types"

export function searchPath(seeker: number[], waypoint: number[], tileset: Tileset, settings: Settings) {

    let round: number = 0

    const seekerColor: string = (document.getElementById(`${seeker[0]}-${seeker[1]}`).childNodes[0] as HTMLDivElement).style.background as string
    console.log(seekerColor)


}