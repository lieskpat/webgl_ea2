"use strict";

import { initContext } from "./modules/initContext.js";
import { linkShader } from "./shader/linkShader.js";
import { loadVertexData } from "./modules/loadVertexData.js";
import { bindVertexBuffer } from "./modules/bindVertexBuffer.js";

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
