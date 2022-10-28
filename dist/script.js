import { display, renderDefaultSpheres, renderTileset } from "./renderer.js";
const app = document.querySelector('#app');
const colors = ['#FA6B5D', '#F79C53', '#EFC95E', '#76BD6D', '#59AAA4', '#9F82C4', '#C482BD'];
const settings = {
    width: 9,
    height: 9,
    sphereAmount: 3,
    defaultSeeker: 'S',
    defaultWaypoint: 'W',
    defaultSphere: '#',
};
const tileset = renderTileset(settings.width, settings.height);
const defaultColors = renderTileset(settings.width, settings.height);
renderDefaultSpheres(tileset, defaultColors, settings, colors);
app.append(display(tileset, defaultColors, settings));
console.table(tileset);
console.table(defaultColors);
