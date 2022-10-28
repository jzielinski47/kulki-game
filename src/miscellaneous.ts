export function getRandomInt(max: number) {
    return Math.floor(Math.random() * max);
}

export function removeClassName(name: string | number) {
    document.querySelectorAll('.' + name).forEach(seeker => seeker.classList.remove(name.toString()))
}