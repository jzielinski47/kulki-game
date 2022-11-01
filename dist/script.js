import { display, renderDefaultSpheres, renderTileset, renderUpcoming } from "./renderer.js";
const app = document.querySelector('#app');
const colors = ['#FA6B5D', '#F79C53', '#EFC95E', '#76BD6D', '#59AAA4', '#9F82C4', '#C482BD'];
// default settings for the project
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
const defaultColors = renderTileset(settings.width, settings.height);
renderDefaultSpheres(tileset, defaultColors, settings, colors);
app.append(display(tileset, defaultColors, settings));
console.table(tileset);
console.table(defaultColors);
renderUpcoming(colors, tileset, settings);
