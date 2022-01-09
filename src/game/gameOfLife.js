import gameLoop from "../core/gameLoop"

export default function GameOfLife({ board }) {
    let _gameLoop = null
    let population = board.getInitialPopulation()
    let nextPopulation = Array.from({ length: board.getWidth() }, _ => Array.from({ length: board.getHeight() }, _ => 0))

    function awake(i, j) {
        nextPopulation[i][j] = 1
        board.drawCell(i, j)
    }

    function kill(i, j) {
        nextPopulation[i][j] = 0
        board.clearCell(i, j)
    }

    function swapBuffers(source, dest) {
        for (let i = 0; i < source.length; ++i) {
            dest[i] = source[i].slice()
        }
    }

    function nextState() {
        const N = population.length - 1
        for (let i = 0; i < N; i++) {
            const M = population[i].length - 1
            for (let j = 0; j < M; j++) {

                const n = top(i, j)
                    + topRight(i, j)
                    + right(i, j)
                    + bottomRight(i, j)
                    + bottom(i, j)
                    + bottomLeft(i, j)
                    + left(i, j)
                    + topLeft(i, j)

                if (isAlive(i, j) && (n < 2 || n > 3)) {
                    kill(i, j)
                }

                if (isAlive(i, j) && (n === 2 || n === 3)) {
                    awake(i, j)
                }

                if (!isAlive(i, j) && n === 3) {
                    awake(i, j)
                }
            }
        }

        swapBuffers(nextPopulation, population)
    }

    function run() {
        _gameLoop = new gameLoop({
            callback: nextState,
            fps: 60
        })

        return this
    }

    function stop() {
        if (!_gameLoop) return
        _gameLoop.stop()
        _gameLoop = null
        board.init()
    }

    const isAlive = (i, j) => board.hasIn(i, j) && population[i][j]
    const bottom = (i, j) => board.hasIn(i + 1, j) ? population[i + 1][j] : 0
    const top = (i, j) => board.hasIn(i - 1, j) ? population[i - 1][j] : 0
    const left = (i, j) => board.hasIn(i, j - 1) ? population[i][j - 1] : 0
    const right = (i, j) => board.hasIn(i, j + 1) ? population[i][j + 1] : 0
    const bottomLeft = (i, j) => board.hasIn(i + 1, j - 1) ? population[i + 1][j - 1] : 0
    const bottomRight = (i, j) => board.hasIn(i + 1, j + 1) ? population[i + 1][j + 1] : 0
    const topLeft = (i, j) => board.hasIn(i - 1, j - 1) ? population[i - 1][j - 1] : 0
    const topRight = (i, j) => board.hasIn(i - 1, j + 1) ? population[i - 1][j + 1] : 0

    return {
        run,
        stop,
        awake
    }
}


