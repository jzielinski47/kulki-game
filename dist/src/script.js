import { renderDefaultBalls, renderTileset } from "./gameRenderer";
var app = document.querySelector('#app');
var colors = ['#FA6B5D', '#F79C53', '#EFC95E', '#76BD6D', '#59AAA4', '#9F82C4', '#C482BD'];
var defaultSettings = {
    width: 9,
    height: 9,
    defaultObstacles: 2,
    defaultSeeker: 'S',
    defaulWaypoint: 'W',
    defaultObstacleMark: '#',
};
var tileset = renderTileset(defaultSettings.width, defaultSettings.height);
renderDefaultBalls(tileset, defaultSettings);
