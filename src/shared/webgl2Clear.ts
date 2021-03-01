const webgl2Clear = (gl: WebGL2RenderingContext) => {
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)
}

export default webgl2Clear
