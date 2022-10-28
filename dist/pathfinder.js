import { runPathfinder } from "./renderer.js";
// Common Search Path Initial Function Reference
export function searchPath(seeker, waypoint, tileset, settings) {
    let round = 0;
    const origin = document.getElementById(`${seeker[0]}-${seeker[1]}`);
    const seekerColor = origin.childNodes[0].style.background;
    // origin.removeChild(origin.childNodes[0])
    // removeFromArray(settings.defaultSeeker, tileset, true, settings)
    runPathfinder(seeker, waypoint, round, tileset, settings, seekerColor);
}
