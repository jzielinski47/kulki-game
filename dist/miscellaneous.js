export function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}
export function removeClassName(name) {
    document.querySelectorAll('.' + name).forEach(seeker => seeker.classList.remove(name.toString()));
}
