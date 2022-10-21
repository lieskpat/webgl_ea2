function bindVertexBuffer(gl, program) {
    const posAttrib = gl.getAttribLocation(program, "pos");
    gl.vertexAttribPointer(posAttrib, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(posAttrib);
}

export { bindVertexBuffer };
