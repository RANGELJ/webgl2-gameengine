type Args = {
    gl: WebGL2RenderingContext;
    vertexShader: WebGLShader;
    fragmentShader: WebGLShader;
    doValidate: boolean;
}

const webgl2CreateProgram = ({
    gl,
    vertexShader,
    fragmentShader,
    doValidate,
}: Args) => {
    const program = gl.createProgram()

    if (!program) {
        throw new Error("Couldn't create program from webgl")
    }

    gl.attachShader(program, vertexShader)
    gl.attachShader(program, fragmentShader)
    gl.linkProgram(program)

    const linkStatus: unknown = gl.getProgramParameter(program, gl.LINK_STATUS)

    if (!linkStatus) {
        const errorMessage = `Error creating shader program: ${gl.getProgramInfoLog(program)}`
        gl.deleteProgram(program)
        throw new Error(errorMessage)
    }

    if (doValidate) {
        gl.validateProgram(program)
        const validateStatus: unknown = gl.getProgramParameter(program, gl.VALIDATE_STATUS)

        if (!validateStatus) {
            const errorMessage = `Error validating program: ${gl.getProgramInfoLog(program)}`
            gl.deleteProgram(program)
            throw new Error(errorMessage)
        }
    }

    gl.detachShader(program, vertexShader)
    gl.detachShader(program, fragmentShader)
    gl.deleteShader(vertexShader)
    gl.deleteShader(fragmentShader)

    return program
}

export default webgl2CreateProgram
