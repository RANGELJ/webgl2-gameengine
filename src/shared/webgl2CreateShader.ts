type Args = {
    gl: WebGL2RenderingContext;
    src: string;
    type: 'vertex' | 'fragment';
}

const webgl2CreateShader = ({
    gl,
    src,
    type,
}: Args) => {
    const shader = gl.createShader(type === 'vertex' ? gl.VERTEX_SHADER : gl.FRAGMENT_SHADER)

    if (!shader) {
        throw new Error(`Error creating shader type: [${type}]`)
    }

    gl.shaderSource(shader, src)
    gl.compileShader(shader)

    const compileStatus: unknown = gl.getShaderParameter(shader, gl.COMPILE_STATUS)

    if (!compileStatus) {
        const errorMessage = `\nError compiling shader\n:\n${src}\n:\n${gl.getShaderInfoLog(shader) || 'Empty info log'}`
        gl.deleteShader(shader)
        throw new Error(errorMessage)
    }

    return shader
}

export default webgl2CreateShader
