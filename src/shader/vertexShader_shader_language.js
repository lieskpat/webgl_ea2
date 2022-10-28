export default `
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
