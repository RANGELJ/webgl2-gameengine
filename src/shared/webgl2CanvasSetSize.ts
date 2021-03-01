type Args = {
    gl: WebGL2RenderingContext;
    canvas: HTMLCanvasElement;
    width: number;
    height: number;
}

const webgl2CanvasSetSize = ({
    gl,
    canvas,
    height,
    width,
}: Args) => {
    canvas.style.width = `${width}px`
    canvas.style.height = `${height}px`
    canvas.width = width
    canvas.height = height

    gl.viewport(0, 0, width, height)
}

export default webgl2CanvasSetSize
