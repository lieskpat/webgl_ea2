function loadVertexData(gl) {
    const vertices = new Float32Array([1, 1, -1, 1, 1, -1, -1, -1]);
    const vbo = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
}

export { loadVertexData };
