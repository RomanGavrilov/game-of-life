export function toCanvas(step) {
    return function project(i) {
        return i * step
    }
}

export function toBoard(step) {
    return function project(i) {
        return Math.floor(i / step)
    }
}
