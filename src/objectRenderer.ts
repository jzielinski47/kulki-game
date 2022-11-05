import { sphereClickHandler } from "./pathfinder.js";
import { Sphere } from "./Sphere.js";
import { Settings, Tileset } from "./types/types";

export function renderSphere(x: number, y: number, color: string, tileset: Tileset, settings: Settings) {
    const model: Sphere = new Sphere(color)
    const sphere = model.render()

    sphere.addEventListener('click', e => sphereClickHandler(e, x, y, tileset, settings))

    return sphere;
}