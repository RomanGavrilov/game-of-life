export default function Board({ ctx, clientSize, projector }) {
    const width = projector.toBoard(clientSize.x)
    const height = projector.toBoard(clientSize.y)
    let initialPopulation = null
    const padding = i => i - 2
    const margin = i => i + 1

    function init() {
        initialPopulation = Array.from({ length: width }, _ => Array.from({ length: height }, _ => 0))
        drawGrid()
    }
    init()

    function drawGrid() {
        ctx.clearRect(0, 0, clientSize.x, clientSize.y)
        console.log(clientSize.x, clientSize.y)
        for (var x = 0; x < clientSize.x; x += projector.step) {
            ctx.moveTo(x, 0);
            ctx.lineTo(x, clientSize.y);
        }
        for (var y = 0; y < clientSize.y; y += projector.step) {
            ctx.moveTo(0, y);
            ctx.lineTo(clientSize.x, y);
        }
        ctx.strokeStyle = "#cccccc";
        ctx.stroke();
    }

    function drawCell(i, j) {
        ctx.fillRect(
            margin(projector.toCanvas(i)),
            margin(projector.toCanvas(j)),
            padding(projector.step),
            padding(projector.step)
        )
    }

    function clearCell(i, j) {
        ctx.clearRect(
            margin(projector.toCanvas(i)),
            margin(projector.toCanvas(j)),
            padding(projector.step),
            padding(projector.step)
        )
    }

    return {
        awake: (i, j) => {
            drawCell(i, j)
            initialPopulation[i][j] = 1
        },
        init,
        drawCell,
        clearCell,
        hasIn: (i, j) => i >= 0 && i <= width && j >= 0 && j <= height,
        getWidth: () => width,
        getHeight: () => height,
        getProjector: () => projector,
        getInitialPopulation: () => initialPopulation
    }
}