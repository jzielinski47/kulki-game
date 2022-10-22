import { renderPlayField } from "./gameRenderer";
const app = document.querySelector('#app');
const colors = ['#FA6B5D', '#F79C53', '#EFC95E', '#76BD6D', '#59AAA4', '#9F82C4', '#C482BD'];
const defaultSettings = {
    width: 9,
    height: 9,
    balls: 2,
    defaultSeeker: 'S',
    defaulWaypoint: 'W',
    defaultBall: 'X',
};
const tileset = renderPlayField(defaultSettings.width, defaultSettings.height);
