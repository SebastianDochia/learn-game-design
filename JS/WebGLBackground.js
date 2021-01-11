var vertexShaderText = [
    'precision mediump float;',
    '',
    'attribute vec2 vertPosition;',
    'attribute vec3 vertColor;',
    'varying vec3 fragColor;',
    '',
    'void main()',
    '{',
    '   fragColor = vertColor;',
    '   gl_Position = vec4(vertPosition, 0.0, 1.0);',
    '}'
].join('\n');

var fragmentShaderText =
[
    'precision mediump float;',
    '',
    'varying vec3 fragColor;',
    'void main()',
    '{',
    ' gl_FragColor = vec4(fragColor, 1.0);',
    '}'
].join('\n');

var FunctieGL = function(DarkModeEnabled) {
    console.log('Functioneaza WebGLu');

    var canvas = document.getElementById('WebGLBackground');
    var g1 = canvas.getContext('webgl');
    if (DarkModeEnabled) {
        g1.clearColor(0.75,0.85,0.8,1.0);
        g1.clear(g1.COLOR_BUFFER_BIT | g1.DEPTH_BUFFER_BIT)
    }
    else {
        g1.clearColor(0.0,0.0,0.0,1.0);
        g1.clear(g1.COLOR_BUFFER_BIT | g1.DEPTH_BUFFER_BIT)
    }
    var vertexShader = g1.createShader(g1.VERTEX_SHADER);
    var fragmentShader = g1.createShader(g1.FRAGMENT_SHADER);

    g1.shaderSource(vertexShader, vertexShaderText);
    g1.shaderSource(fragmentShader, fragmentShaderText);

    g1.compileShader(vertexShader);
    if (!g1.getShaderParameter(vertexShader, g1.COMPILE_STATUS)){
        console.error('ERROR compiling vertex shader!', g1.getShaderInfoLog(vertexShader));
        return;
    }

    g1.compileShader(fragmentShader);
    if (!g1.getShaderParameter(fragmentShader, g1.COMPILE_STATUS)){
        console.error('ERROR compiling fragment shader!', g1.getShaderInfoLog(fragmentShader));
        return;
    }

    var program = g1.createProgram();
    g1.attachShader(program, vertexShader);
    g1.attachShader(program, fragmentShader);
    g1.linkProgram(program);

    var triangleVertices =
    [
        0.0, 0.5, 1.0, 1.0, 0.0,
        -0.5, -0.5, 0.7, 0.0, 1.0,
        0.5, -0.5, 0.1, 1.0, 0.6
    ];

    var triangleVertexBufferObject = g1.createBuffer();
    g1.bindBuffer(g1.ARRAY_BUFFER, triangleVertexBufferObject);
    g1.bufferData(g1.ARRAY_BUFFER, new Float32Array(triangleVertices), g1.STATIC_DRAW);

    var positionAttributeLocation = g1.getAttribLocation(program, 'vertPosition');
    var colorAttributeLocation = g1.getAttribLocation(program, 'vertColor');
    g1.vertexAttribPointer(
        positionAttributeLocation,
        2,
        g1.FLOAT,
        g1.FALSE,
        5 * Float32Array.BYTES_PER_ELEMENT,
        0
    );
    g1.vertexAttribPointer(
        colorAttributeLocation,
        3,
        g1.FLOAT,
        g1.FALSE,
        5 * Float32Array.BYTES_PER_ELEMENT,
        2 * Float32Array.BYTES_PER_ELEMENT
    );

    g1.enableVertexAttribArray(positionAttributeLocation);
    g1.enableVertexAttribArray(colorAttributeLocation);

        //Main render
    g1.useProgram(program);
    g1.drawArrays(g1.TRIANGLES, 0, 3);
}