(function () {
    'use strict';

    function initContext(id) {
        const canvas = document.getElementById(id);
        const gl = canvas.getContext("webgl");
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
    //attribute vec2 pos;
    attribute vec2 pos;
    uniform vec2 translation;
    //uniform vec4 rotation;
    void main() {
        //berechnet neue Position der Übergebenen Vertices
        //gl_position ist vierdimensionaler Vektor in homogenen Koordinaten
        //der form vec4(x, y, z, w)
        //übergabe eines Vektors (pos.x/2, pos.y/2, z=0, w=1)
        //gl_Position = vec4(pos * 0.5, 0, 1);
        gl_Position = vec4(pos + translation, 0, 1);
    }
`;

    //Fragment Shader dienen unter anderem der Einfärbung
    var fragmentGlsl = `
    void main(){
        //vierdimensionaler Vektor vec4(1, 1, 1, 1, 1)
        //RGB + Alpha Kanal
        gl_FragColor = vec4(1);
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
    const lineVertices = [0, 0, 0.25, 0, 0.25, 0, 0.5, 0, 1, 3, 4];

    function loadVertexData() {
        return new Float32Array(lineVertices);
    }

    function initWebGl(gl) {
        const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexGlsl);
        const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentGlsl);
        const prog = createProgram(gl, vertexShader, fragmentShader);
        const positionAttributeLocation = gl.getAttribLocation(prog, "pos");
        const translationAttrib = gl.getUniformLocation(prog, "translation");
        const positionBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, loadVertexData(), gl.STATIC_DRAW);

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

    const lsystem = {
        axiom: "F--F--F",
        rule: {
            orig: "F",
            subst: "F+F--F+F",
        },
    };

    function buildLsystem(loopCount) {
        let sentence = lsystem.axiom;
        for (let i = 0; i < loopCount; i++) {
            let result = "";
            for (let j = 0; j < sentence.length; j++) {
                let current = sentence.charAt(j);
                if (current === lsystem.rule.orig) {
                    result += lsystem.rule.subst;
                } else {
                    result += current;
                }
            }
            sentence = result;
            console.log(sentence);
        }
        return sentence;
    }

    function keyEvents(gl) {
        document.addEventListener("keydown", function (e) {
            switch (e.key) {
                case "r":
                    console.log(e);
                    break;
                case "l":
                    console.log(e);
                    break;
            }
        });
    }

    const translation = {
        trans: [0.25, 0],
    };

    const gl = initContext("gl_context");
    keyEvents();
    const initObject = initWebGl(gl);
    //console.log(initObject);
    //gl.clearColor(0, 0, 0, 1);
    //gl.clear(gl.COLOR_BUFFER_BIT);
    function render(gl) {
        return function () {
            gl.clearColor(0, 0, 0, 1);
            gl.clear(gl.COLOR_BUFFER_BIT);
            gl.useProgram(initObject.program);
            gl.uniform4fv(
                initObject.attribLocation.translationAttrib,
                translation.trans
            );
            gl.bindBuffer(gl.ARRAY_BUFFER, initObject.bindingBuffer);
            const positionAttributeLocation = gl.getAttribLocation(
                initObject.program,
                "pos"
            );
            gl.enableVertexAttribArray(positionAttributeLocation);
            gl.vertexAttribPointer(
                initObject.attribLocation.positionAttributeLocation,
                2,
                gl.FLOAT,
                false,
                0,
                0
            );
            gl.drawArrays(gl.LINES, 0, 2);
        };
    }

    render(gl)();
    //render(gl)();
    //render(gl)();
    //const attrib = initRenderPipeline(gl);
    //console.log(attrib);
    const sentence = buildLsystem(1);
    //turtle(sentence, gl, initObject, render(gl));

    const resultTag = document.getElementById("result");
    resultTag.insertAdjacentText("afterbegin", sentence);
    //const result = buildLsystem(4);
    console.log(result);

})();
