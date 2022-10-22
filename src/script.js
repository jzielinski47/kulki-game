"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const gameRenderer_js_1 = require("./gameRenderer.js");
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
const tileset = (0, gameRenderer_js_1.renderTileset)(defaultSettings.width, defaultSettings.height);
(0, gameRenderer_js_1.renderDefaultBalls)(tileset, defaultSettings, colors);
