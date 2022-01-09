
export default function gameLoop({ callback, fps }) {
    const int = 1000
    let startedAt = Date.now()
    let running = true
    let animationId = undefined

        ; (function animate() {
            if (!running) {
                cancelAnimationFrame(animationId)
                return
            }
            animationId = requestAnimationFrame(animate)
            const now = Date.now()
            const diff = now - startedAt
            if (diff > int / fps) {
                callback()
                startedAt = now
            }
        })(running)

    function stop() {
        running = false
    }

    return {
        stop
    }
}
