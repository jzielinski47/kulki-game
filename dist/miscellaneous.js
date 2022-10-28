export function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}
export function removeClassName(name) {
    document.querySelectorAll('.' + name).forEach(seeker => seeker.classList.remove(name.toString()));
}
export function removeFromArray(name, arr, moved, settings) {
    for (let x = 0; x < arr.length; x++) {
        for (let y = 0; y < arr[x].length; y++) {
            if (arr[x][y] == name) {
                switch (name) {
                    case settings.defaultSeeker:
                        (moved) ? arr[x][y] = 0 : arr[x][y] = settings.defaultSphere;
                        break;
                    case settings.defaultWaypoint:
                        arr[x][y] = 0;
                        document.querySelector(x + '-' + y).innerHTML = '0';
                        break;
                    default:
                        arr[x][y] = 0;
                        document.querySelector(x + '-' + y).innerHTML = '0';
                        break;
                }
            }
        }
    }
}
export function getCords(id) {
    return id.split('-').map(item => parseInt(item));
}