export function remove(tileset, what) {
    for (let x = 0; x < tileset.length; x++) {
        for (let y = 0; y < tileset[x].length; y++) {
            if (tileset[x][y] == what)
                tileset[x][y] = 0;
        }
    }
}
export function removeClassName(what) {
    document.querySelectorAll('.' + what).forEach(seeker => seeker.classList.remove(what.toString()));
}
