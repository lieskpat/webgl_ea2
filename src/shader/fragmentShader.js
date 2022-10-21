import fragment from "./fragmentShader_shader_language.js";

// Compile a fragment shader
function compileFragmentShader(gl) {
    const fsSource = fragment;
    const fs = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fs, fsSource);
    gl.compileShader(fs);

    return fs;
}

export { compileFragmentShader };
