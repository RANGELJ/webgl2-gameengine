type Args = {
    fps?: number;
    callback: (deltaTime: number) => void;
}

const createRenderLoopFunction = ({
    fps: paramFps,
    callback,
}: Args) => {
    let milisSinceLastFrame: number = 0
    let isActive = false
    let fps = 0

    let runFunction: () => void

    if (paramFps && paramFps > 0) {
        const milisFpsLimit = 1000 / paramFps

        runFunction = () => {
            const msCurrent = performance.now()
            const msDelta = (msCurrent - milisSinceLastFrame)
            const deltaTime = msDelta / 1000

            if (msDelta >= milisFpsLimit) {
                fps = Math.floor(1 / deltaTime)
                milisSinceLastFrame = msCurrent
                callback(deltaTime)
            }

            if (isActive) { window.requestAnimationFrame(runFunction) }
        }
    } else {
        runFunction = () => {
            const msCurrent = performance.now()
            const deltaTime = (msCurrent - milisSinceLastFrame) / 1000
            fps = Math.floor(1 / deltaTime)
            milisSinceLastFrame = msCurrent
            callback(deltaTime)

            if (isActive) {
                window.requestAnimationFrame(runFunction)
            }
        }
    }

    const start = () => {
        isActive = true
        milisSinceLastFrame = performance.now()
        window.requestAnimationFrame(runFunction)
    }

    const stop = () => {
        isActive = false
    }

    return { start, stop }
}

export default createRenderLoopFunction
