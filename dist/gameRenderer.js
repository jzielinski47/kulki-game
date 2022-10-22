import { getRandomInt } from "./misc";
export function renderTileset(width, height) {
    let tab = [];
    for (let x = 0; x < height; x++) {
        tab[x] = [];
        for (let y = 0; y < width; y++) {
            tab[x][y] = 0;
        }
    }
    return tab;
}
export function renderDefaultBalls(tileset, settings) {
    for (let i = 0; i < settings.defaultObstacles; i++) {
        let cords = [getRandomInt(settings.height), getRandomInt(settings.width)];
        while (tileset[cords[0]][cords[1]] == settings.defaultObstacleMark) {
            cords = [getRandomInt(settings.height), getRandomInt(settings.width)];
        }
        tileset[cords[0]][cords[1]] = settings.defaultObstacleMark;
    }
}
export function renderBall(color) {
    const ball = document.createElement('div');
    ball.className = 'ball';
    ball.style.background = color;
    return ball;
}
