import { sphereClickHandler } from "./pathfinderScripts.js";
import { Sphere } from "./Sphere.js";
export function renderSphere(x, y, color, tileset, settings) {
    const model = new Sphere(color);
    const sphere = model.render();
    sphere.addEventListener('click', e => sphereClickHandler(e, x, y, tileset, settings));
    return sphere;
}
