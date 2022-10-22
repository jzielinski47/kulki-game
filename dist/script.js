import { display, renderDefaultBalls, renderTileset } from "./gameRenderer.js";
const app = document.querySelector('#app');
const colors = ['#FA6B5D', '#F79C53', '#EFC95E', '#76BD6D', '#59AAA4', '#9F82C4', '#C482BD'];
const defaultSettings = {
    width: 9,
    height: 9,
    defaultObstacles: 3,
    defaultSeeker: 'S',
    defaulWaypoint: 'W',
    defaultObstacleMark: '#',
};
const tileset = renderTileset(defaultSettings.width, defaultSettings.height);
const balls = renderTileset(defaultSettings.width, defaultSettings.height);
renderDefaultBalls(tileset, balls, defaultSettings, colors);
app.append(display(tileset, balls, defaultSettings));
