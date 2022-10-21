(function () {
    'use strict';

    function initContext(id) {
        const canvas = document.getElementById(id);
        const gl = canvas.getContext("webgl");
        return gl;
    }

    var shader = `
    attribute vec2 pos;
    void main(){
        gl_Position = vec4(pos * 0.5, 0, 1);
    }
`;

    // Compile a vertex shader
    function compileVertexShader(gl) {
        const vsSource = shader;
        const vs = gl.createShader(gl.VERTEX_SHADER);
        gl.shaderSource(vs, vsSource);
        gl.compileShader(vs);

        return vs;
    }

    var fragment = `
    void main(){
        gl_FragColor = vec4(1);
    }
`;

    // Compile a fragment shader
    function compileFragmentShader(gl) {
        const fsSource = fragment;
        const fs = gl.createShader(gl.FRAGMENT_SHADER);
        gl.shaderSource(fs, fsSource);
        gl.compileShader(fs);

        return fs;
    }

    function linkShader(gl) {
        const prog = gl.createProgram();
        gl.attachShader(prog, compileVertexShader(gl));
        gl.attachShader(prog, compileFragmentShader(gl));
        gl.linkProgram(prog);
        gl.useProgram(prog);

        return prog;
    }

    function loadVertexData(gl) {
        const vertices = new Float32Array([1, 1, -1, 1, 1, -1, -1, -1]);
        const vbo = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
        gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
    }

    function bindVertexBuffer(gl, program) {
        const posAttrib = gl.getAttribLocation(program, "pos");
        gl.vertexAttribPointer(posAttrib, 2, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(posAttrib);
    }

    const gl = initContext("gl_context");

    gl.clearColor(0, 0, 0, 1);

    //Vorbereitung der Shader Programme
    const program = linkShader(gl);

    //Bereitstellung der 3D Modelle aus Vertex Daten
    loadVertexData(gl);

    //Konfiguration der Rendering Pipeline
    // Bind vertex buffer to attribute variable
    bindVertexBuffer(gl, program);

    //Organisation des Rendervorgangs
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

})();
