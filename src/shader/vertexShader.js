import shader from "./vertexShader_shader_language.js";

// Compile a vertex shader
function compileVertexShader(gl) {
    const vsSource = shader;
    const vs = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vs, vsSource);
    gl.compileShader(vs);

    return vs;
}

export { compileVertexShader };
