import { compileVertexShader } from "./vertexShader.js";
import { compileFragmentShader } from "./fragmentShader.js";

function linkShader(gl) {
    const prog = gl.createProgram();
    gl.attachShader(prog, compileVertexShader(gl));
    gl.attachShader(prog, compileFragmentShader(gl));
    gl.linkProgram(prog);
    gl.useProgram(prog);

    return prog;
}

export { linkShader };
