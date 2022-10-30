(function () {
    'use strict';

    function initContext(id) {
        const canvas = document.getElementById(id);
        const gl = canvas.getContext("webgl");
        if (!gl) {
            console.log("error: no gl context");
        }
        return gl;
    }

    // create a shader
    function createShader(gl, type, source) {
        //createShader erzeugt Shader Objekt
        //in das Shader-Programm geladen wird
        const shader = gl.createShader(type);
        //lädt Programmcode in Shader-Objekt
        gl.shaderSource(shader, source);
        //übersetzt Programm im Shader
        gl.compileShader(shader);
        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
            console.log("error: compiling shader");
        }
        return shader;
    }

    var vertexGlsl = `
    //zweidimensionaler Vektor
    attribute vec2 pos;
    void main() {
        //berechnet neue Position der Übergebenen Vertices
        //gl_position ist vierdimensionaler Vektor in homogenen Koordinaten
        //der form vec4(x, y, z, w)
        gl_Position = vec4(pos, 0, 1);
    }
`;

    //Fragment Shader dienen unter anderem der Einfärbung
    var fragmentGlsl = `
    void main(){
        //vierdimensionaler Vektor vec4(1, 1, 1, 1, 1)
        //RGB + Alpha Kanal
        gl_FragColor = vec4(1, 0, 0, 1);
    }
`;

    function createProgram(gl, vertexShader, fragmentShader) {
        const prog = gl.createProgram();
        //fügt Shader-Objekt zu einem GPU-Programm hinzu
        gl.attachShader(prog, vertexShader);
        gl.attachShader(prog, fragmentShader);
        //verbindet die Shader und erzeugt ausführbares GPU Programm
        gl.linkProgram(prog);
        if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
            console.log("Error: linking shader program");
        }
        return prog;
    }

    //line start and end point
    const lineVertices = [0, 0, -0.25, 0, 0, 0, 0, 0.25, 0, 0, 0, -0.25];

    function loadVertexData() {
        return new Float32Array(lineVertices);
    }

    function initWebGl(gl) {
        const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexGlsl);
        const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentGlsl);
        const prog = createProgram(gl, vertexShader, fragmentShader);
        //get the storage location of a position (pos)
        const positionAttributeLocation = gl.getAttribLocation(prog, "pos");
        //get the storage location of a uniform for example a transition
        const translationAttrib = gl.getUniformLocation(prog, "translation");
        //create a buffer onject
        const positionBuffer = gl.createBuffer();
        //bind the buffer object to target for example ARRAY_BUFFER
        gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
        //write data into the buffer object
        gl.bufferData(gl.ARRAY_BUFFER, loadVertexData(), gl.STATIC_DRAW);
        //return javascript object with all relevant data/objects
        return {
            shader: {
                vertex_shader: vertexShader,
                fragment_shader: fragmentShader,
            },
            program: prog,
            attribLocation: {
                position: positionAttributeLocation,
                translation: translationAttrib,
            },
            bindingBuffer: positionBuffer,
        };
    }

    const gl = initContext("gl_context");
    const initObject = initWebGl(gl);
    function initBuffer(gl) {
        gl.useProgram(initObject.program);
        //assign the buffer object to a position variable (pos in vertex shader)
        gl.vertexAttribPointer(
            initObject.attribLocation.positionAttributeLocation,
            2,
            gl.FLOAT,
            false,
            0,
            0
        );
        //enable the assignment to a position variable (pos in vertex shader)
        gl.enableVertexAttribArray(
            initObject.attribLocation.positionAttributeLocation
        );
    }
    function render(gl) {
        initBuffer(gl);
        gl.clearColor(0, 0, 0, 1);
        gl.clear(gl.COLOR_BUFFER_BIT);
        gl.drawArrays(gl.LINES, 0, 6);
    }

    render(gl);

})();
