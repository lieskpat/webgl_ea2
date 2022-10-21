"use strict";

function initContext(id) {
    const canvas = document.getElementById(id);
    const gl = canvas.getContext("webgl");
    return gl;
}

export { initContext };
