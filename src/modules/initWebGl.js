import { createShader } from "../shader/createShader.js";
import vertexGlsl from "../shader/vertexShader_shader_language.js";
import fragmentGlsl from "../shader/fragmentShader_shader_language.js";
import { createProgram } from "../shader/createProgram.js";
import { loadVertexData } from "./loadVertexData.js";

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

export { initWebGl };
