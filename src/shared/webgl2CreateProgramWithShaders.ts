import webgl2CreateProgram from './webgl2CreateProgram'
import webgl2CreateShader from './webgl2CreateShader'

type Args = {
    gl: WebGL2RenderingContext;
    vertexShaderSource: string;
    fragmentShaderSource: string;
    doValidate: boolean;
}

const webgl2CreateProgramWithShaders = ({
    gl,
    vertexShaderSource,
    fragmentShaderSource,
    doValidate,
}: Args) => webgl2CreateProgram({
    gl,
    doValidate,
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

export default webgl2CreateProgramWithShaders
