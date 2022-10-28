"use strict";

import { initContext } from "./modules/initContext.js";
import { initWebGl } from "./modules/initWebGl.js";
//import { initRenderPipeline } from "./modules/draw.js";
import { buildLsystem, turtle } from "./modules/lsystem.js";
import { setListener, keyEvents } from "./modules/events.js";

const translation = {
    trans: [0.25, 0],
};

const gl = initContext("gl_context");
keyEvents(gl);
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
