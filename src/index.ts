import webgl2CanvasSetSize from './shared/webgl2CanvasSetSize'
import webgl2Clear from './shared/webgl2Clear'
import webgl2CreateProgram from './shared/webgl2CreateProgram'
import webgl2CreateShader from './shared/webgl2CreateShader'

const vertexShaderSource = `
#version 300 es

in vec3 a_position;

uniform float uPointSize;

void main() {
    gl_PointSize = uPointSize;
    gl_Position = vec4(a_position, 1.0);
}
`.trim()

const fragmentShaderSource = `
#version 300 es

precision mediump float;

out vec4 finalColor;

void main() {
    finalColor = vec4(0.5, 0.0, 0.0, 1.0);
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

    webgl2Clear(gl)

    // SHADER STEPS
    // 1: Get Vertex and Fragment shader text
    // 2: Compile text and validate
    // 3: Link the shaders together as a program
    // 4: Get location of uniforms and attributes
    const program = webgl2CreateProgram({
        gl,
        doValidate: true,
        vertexShader: webgl2CreateShader({
            gl,
            src: vertexShaderSource,
            type: 'vertex',
        }),
        fragmentShader: webgl2CreateShader({
            gl,
            src: fragmentShaderSource,
            type: 'fragment',
        }),
    })

    gl.useProgram(program)
    const aPositionLoc = gl.getAttribLocation(program, 'a_position')
    const uPointSieLoc = gl.getUniformLocation(program, 'uPointSize')
    gl.useProgram(null)

    const aryVerts = new Float32Array([
        0, 0, 0,
        0.5,0.5,0,
        -0.5,-0.5,0,
    ])
    const bufVerts = gl.createBuffer()

    gl.bindBuffer(gl.ARRAY_BUFFER, bufVerts)
    gl.bufferData(gl.ARRAY_BUFFER, aryVerts, gl.STATIC_DRAW)
    gl.bindBuffer(gl.ARRAY_BUFFER, null)

    gl.useProgram(program)
    gl.uniform1f(uPointSieLoc, 50.0)

    gl.bindBuffer(gl.ARRAY_BUFFER, bufVerts)
    gl.enableVertexAttribArray(aPositionLoc)
    gl.vertexAttribPointer(aPositionLoc, 3, gl.FLOAT, false, 0, 0)
    gl.bindBuffer(gl.ARRAY_BUFFER, null)

    gl.drawArrays(gl.POINTS, 0, aryVerts.length / 3)

    return canvas
}

document.body.appendChild(component())
