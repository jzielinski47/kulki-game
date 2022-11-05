import { renderTileset, renderDefaultSpheres, display } from "./renderer.js";
const app = document.querySelector('#app');
export const colors = ['#FA6B5D', '#F79C53', '#EFC95E', '#76BD6D', '#59AAA4', '#9F82C4', '#C482BD'];
const settings = {
    width: 9,
    height: 9,
    sphereAmount: 3,
    defaultSeeker: 'S',
    defaultWaypoint: 'W',
    defaultSphere: '#',
};
// initial render
const tileset = renderTileset(settings.width, settings.height);
renderDefaultSpheres(tileset, settings);
app.append(display(tileset, settings, colors));
console.table(tileset);
