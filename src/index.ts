import webgl2CanvasSetSize from './shared/webgl2CanvasSetSize'

const webgl2Clear = (gl: WebGL2RenderingContext) => {
    console.log('Here')
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)
}

const component = () => {
    document.body.style.backgroundColor = 'darkgray'
    const canvas = document.createElement('canvas')
    const gl = canvas.getContext('webgl2')

    if (!gl) {
        throw new Error('WebGL conext is not available')
    }

    gl.clearColor(1.0, 1.0, 1.0, 1.0) // Set to white

    webgl2CanvasSetSize({
        canvas,
        gl,
        height: 500,
        width: 500,
    })

    webgl2Clear(gl)

    return canvas
}

document.body.appendChild(component())
