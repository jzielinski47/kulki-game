import { getRandomInt } from "./misc";
export function renderTileset(width, height) {
    var tab = [];
    for (var x = 0; x < height; x++) {
        tab[x] = [];
        for (var y = 0; y < width; y++) {
            tab[x][y] = 0;
        }
    }
    return tab;
}
export function renderDefaultBalls(tileset, settings) {
    for (var i = 0; i < settings.defaultObstacles; i++) {
        var cords = [getRandomInt(settings.height), getRandomInt(settings.width)];
        while (tileset[cords[0]][cords[1]] == settings.defaultObstacleMark) {
            cords = [getRandomInt(settings.height), getRandomInt(settings.width)];
        }
        tileset[cords[0]][cords[1]] = settings.defaultObstacleMark;
    }
}
export function renderBall(color) {
    var ball = document.createElement('div');
    ball.className = 'ball';
    ball.style.background = color;
    return ball;
}
