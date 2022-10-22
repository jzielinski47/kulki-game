import { renderDefaultBalls, renderTileset } from "./gameRenderer.js";
const app = document.querySelector('#app');
const colors = ['#FA6B5D', '#F79C53', '#EFC95E', '#76BD6D', '#59AAA4', '#9F82C4', '#C482BD'];
const defaultSettings = {
    width: 5,
    height: 5,
    defaultObstacles: 3,
    defaultSeeker: 'S',
    defaulWaypoint: 'W',
    defaultObstacleMark: '#',
};
const tileset = renderTileset(defaultSettings.width, defaultSettings.height);
renderDefaultBalls(tileset, defaultSettings, colors);
