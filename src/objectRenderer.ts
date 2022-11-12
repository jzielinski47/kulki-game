import { sphereClickHandler } from "./pathfinderScripts";
import { Sphere } from "./Sphere";
import { Settings, Tileset } from "./types/types";

export function renderSphere(x: number, y: number, color: string, tileset: Tileset, settings: Settings) {
    const model: Sphere = new Sphere(color)
    const sphere = model.render()

    sphere.addEventListener('click', e => sphereClickHandler(e, x, y, tileset, settings))

    return sphere;
}