import createRenderLoopFunction from './shared/createRenderLoopFunction'
import webgl2CanvasSetSize from './shared/webgl2CanvasSetSize'
import webgl2Clear from './shared/webgl2Clear'
import webgl2CreateArrayBuffer from './shared/webgl2CreateArrayBuffer'
import webgl2CreateProgramWithShaders from './shared/webgl2CreateProgramWithShaders'

const vertexShaderSource = `
#version 300 es

in vec3 a_position;

uniform mediump float uPointSize;
uniform float uAngle;

out float size;

void main() {
    gl_PointSize = uPointSize;
    size = uPointSize;

    gl_Position = vec4(
        cos(uAngle) * 0.1 + a_position.x,
        sin(uAngle) * 0.3 + a_position.y,
        a_position.z,
        1.0
    );
}
`.trim()

const fragmentShaderSource = `
#version 300 es
precision mediump float;

in float size;
out vec4 finalColor;

void main() {
    float c = (40.0 - size) / 20.0;
    finalColor = vec4(c, c, c, 1.0);
}
`.trim()

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

    const program = webgl2CreateProgramWithShaders({
        gl,
        doValidate: true,
        vertexShaderSource,
        fragmentShaderSource,
    })

    gl.useProgram(program)
    const aPositionLoc = gl.getAttribLocation(program, 'a_position')
    const uPointSieLoc = gl.getUniformLocation(program, 'uPointSize')
    const uAngleLoc = gl.getUniformLocation(program, 'uAngle')
    gl.useProgram(null)

    const aryVerts = new Float32Array([
        0, 0, 0,
        0.5,0.5,0,
        -0.5,-0.5,0,
    ])

    const vertsBuff = webgl2CreateArrayBuffer({ gl, floatArray: aryVerts, isStatic: true })

    gl.useProgram(program)

    gl.bindBuffer(gl.ARRAY_BUFFER, vertsBuff)
    gl.enableVertexAttribArray(aPositionLoc)
    gl.vertexAttribPointer(aPositionLoc, 3, gl.FLOAT, false, 0, 0)
    gl.bindBuffer(gl.ARRAY_BUFFER, null)

    const gPSizeStep = 50
    let gPointSize = 0
    let gAngle = 0
    const gAngleStep = (Math.PI / 100.0) * 90 // 90 Degs in radians

    const renderLoop = createRenderLoopFunction({
        fps: 60,
        callback: (deltaTime) => {
            gPointSize += gPSizeStep - deltaTime
            const size = (Math.sin(gPointSize) * 10.0) + 30.0
            gl.uniform1f(uPointSieLoc, size)

            gAngle += gAngleStep * deltaTime
            gl.uniform1f(uAngleLoc, gAngle)

            webgl2Clear(gl)
            gl.drawArrays(gl.POINTS, 0, aryVerts.length / 3)
        },
    })

    renderLoop.start()

    return canvas
}

document.body.appendChild(component())
