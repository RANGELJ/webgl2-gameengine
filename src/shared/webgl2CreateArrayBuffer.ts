type Args = {
    gl: WebGL2RenderingContext;
    floatArray: Float32Array;
    isStatic: boolean;
}

const webgl2CreateArrayBuffer = ({
    floatArray,
    gl,
    isStatic,
}: Args) => {
    const buffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
    gl.bufferData(gl.ARRAY_BUFFER, floatArray, isStatic ? gl.STATIC_DRAW : gl.DYNAMIC_DRAW)
    gl.bindBuffer(gl.ARRAY_BUFFER, null)
    return buffer
}

export default webgl2CreateArrayBuffer
