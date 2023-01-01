import { Vector2d } from "../types/vector";
import { TransformToCartesian2d } from "../utils/cartesian";
import { rotateVector2d } from "../utils/tranform2d";
import { initShaderProgram } from "../utils/Webgl/shaders";
import { mat4 } from "gl-matrix";

export default class Canvas {
  private canvas: HTMLCanvasElement;
  private context: WebGLRenderingContext;
  //   private width: number;
  //   private height: number;
  private fps = 60;
  private frameCount = 0;

  private shaderProgram: WebGLProgram;
  private cubeRotation: number = 0;
  private then: number = 0;
  private programInfo: {
    program: WebGLProgram;
    attribLocations: {
      vertexPosition: number;
      vertexColor: number;
    };
    uniformLocations: {
      projectionMatrix: WebGLUniformLocation;
      modelViewMatrix: WebGLUniformLocation;
    };
  };
  vsSource = `
  attribute vec4 aVertexPosition;
  attribute vec4 aVertexColor;

  uniform mat4 uModelViewMatrix;
  uniform mat4 uProjectionMatrix;

  varying lowp vec4 vColor;

  void main(void) {
    gl_Position = uProjectionMatrix * uModelViewMatrix * aVertexPosition;
    vColor = aVertexColor;
  }
`;
  //we use an interpolator - it automatically makes a gradient between colors
  fsSource = `
  varying lowp vec4 vColor;

  void main(void) {
    gl_FragColor = vColor;
  }
`;
  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.context = canvas.getContext("webgl")!;
    this.canvas.style.border = "1px solid black";
    // this.width = 300;
    // this.height = 300;
    // this.canvas.width = this.width;
    // this.canvas.height = this.height;
    // this.canvas.style.width = `${this.width}px`;
    // this.canvas.style.height = `${this.height}px`;

    this.shaderProgram = initShaderProgram(
      this.context,
      this.vsSource,
      this.fsSource,
    )!;
    this.programInfo = {
      program: this.shaderProgram,
      attribLocations: {
        vertexPosition: this.context.getAttribLocation(
          this.shaderProgram,
          "aVertexPosition",
        ),
        vertexColor: this.context.getAttribLocation(
          this.shaderProgram,
          "aVertexColor",
        ),
      },
      uniformLocations: {
        projectionMatrix: this.context.getUniformLocation(
          this.shaderProgram,
          "uProjectionMatrix",
        )!,
        modelViewMatrix: this.context.getUniformLocation(
          this.shaderProgram,
          "uModelViewMatrix",
        )!,
      },
    };
    console.log("canvas has been set!");
    //requesting animation

    console.log(this.then, "then!");
    requestAnimationFrame(this.render);
  }

  render = (now: DOMHighResTimeStamp) => {
    now *= 0.001; // convert to seconds
    const deltaTime = now - this.then;
    this.then = now;
    this.drawScene(deltaTime);
    requestAnimationFrame(this.render);
  };

  initBuffers() {
    // we disable prettier for the bottom variable for ease
    /* prettier-ignore */
    const faceColors = [
      [1.0,  1.0,  1.0,  1.0],    // Front face: white
      [1.0,  0.0,  0.0,  1.0],    // Back face: red
      [0.0,  1.0,  0.0,  1.0],    // Top face: green
      [0.0,  0.0,  1.0,  1.0],    // Bottom face: blue
      [1.0,  1.0,  0.0,  1.0],    // Right face: yellow
      [1.0,  0.0,  1.0,  1.0],    // Left face: purple
    ];
    // Create a buffer for the square's positions.

    let colors: number[] = [];

    for (let j = 0; j < faceColors.length; ++j) {
      const c = faceColors[j];
      // Repeat each color four times for the four vertices of the face
      colors = colors.concat(c, c, c, c);
    }

    const colorBuffer = this.context.createBuffer();
    this.context.bindBuffer(this.context.ARRAY_BUFFER, colorBuffer);
    this.context.bufferData(
      this.context.ARRAY_BUFFER,
      new Float32Array(colors),
      this.context.STATIC_DRAW,
    );

    ///position buffer

    // Now create an array of positions for the square.

    // we disable prettier for the bottom variable for ease
    /* prettier-ignore */
    const positions = [
      // Front face
      -1.0, -1.0,  1.0,
       1.0, -1.0,  1.0,
       1.0,  1.0,  1.0,
      -1.0,  1.0,  1.0,
    
      // Back face
      -1.0, -1.0, -1.0,
      -1.0,  1.0, -1.0,
       1.0,  1.0, -1.0,
       1.0, -1.0, -1.0,
    
      // Top face
      -1.0,  1.0, -1.0,
      -1.0,  1.0,  1.0,
       1.0,  1.0,  1.0,
       1.0,  1.0, -1.0,
    
      // Bottom face
      -1.0, -1.0, -1.0,
       1.0, -1.0, -1.0,
       1.0, -1.0,  1.0,
      -1.0, -1.0,  1.0,
    
      // Right face
       1.0, -1.0, -1.0,
       1.0,  1.0, -1.0,
       1.0,  1.0,  1.0,
       1.0, -1.0,  1.0,
    
      // Left face
      -1.0, -1.0, -1.0,
      -1.0, -1.0,  1.0,
      -1.0,  1.0,  1.0,
      -1.0,  1.0, -1.0,
    ];

    const positionBuffer = this.context.createBuffer();
    this.context.bindBuffer(this.context.ARRAY_BUFFER, positionBuffer);
    this.context.bufferData(
      this.context.ARRAY_BUFFER,
      new Float32Array(positions),
      this.context.STATIC_DRAW,
    );

    //index buffer

    const indexBuffer = this.context.createBuffer();
    this.context.bindBuffer(this.context.ELEMENT_ARRAY_BUFFER, indexBuffer);

    // This array defines each face as two triangles, using the
    // indices into the vertex array to specify each triangle's
    // position.
    /* prettier-ignore */
    const indices = [
      0,  1,  2,      0,  2,  3,    // front
      4,  5,  6,      4,  6,  7,    // back
      8,  9,  10,     8,  10, 11,   // top
      12, 13, 14,     12, 14, 15,   // bottom
      16, 17, 18,     16, 18, 19,   // right
      20, 21, 22,     20, 22, 23,   // left
    ];

    // Now send the element array to GL

    this.context.bufferData(
      this.context.ELEMENT_ARRAY_BUFFER,
      new Uint16Array(indices),
      this.context.STATIC_DRAW,
    );

    return {
      position: positionBuffer,
      color: colorBuffer,
      indices: indexBuffer,
    };
  }
  drawScene(deltaTime: number) {
    this.context.clearColor(0.0, 0.0, 0.0, 1.0);
    this.context.clearDepth(1.0);
    this.context.enable(this.context.DEPTH_TEST);
    this.context.depthFunc(this.context.LEQUAL);
    this.clear();
    const fieldOfView = (45 * Math.PI) / 180; //45degrees in radians
    const aspect =
      this.context.canvas.clientWidth / this.context.canvas.clientHeight;
    const zNear = 0.1;
    const zFar = 100.0;
    const projectionMatrix = mat4.create();

    // note: glmatrix.js always has the first argument
    // as the destination to receive the result.
    // projectionMatrix will be updated
    mat4.perspective(projectionMatrix, fieldOfView, aspect, zNear, zFar);
    const modelViewMatrix = mat4.create();

    //translate first
    mat4.translate(
      modelViewMatrix, // destination matrix
      modelViewMatrix, // matrix to translate
      [-0.0, 0.0, -6.0],
    ); // amount to translate
    //rotate second
    // mat4.rotate(
    //   modelViewMatrix, // destination matrix
    //   modelViewMatrix, // matrix to rotate
    //   this.cubeRotation, // amount to rotate in radians
    //   [0, 0, 1]
    // ); // axis to rotate around (Z)
    // mat4.rotate(
    //   modelViewMatrix, // destination matrix
    //   modelViewMatrix, // matrix to rotate
    //   this.cubeRotation * 0.7, // amount to rotate in radians
    //   [0, 1, 0]
    // ); // axis to rotate around (Y)
    mat4.rotate(
      modelViewMatrix, // destination matrix
      modelViewMatrix, // matrix to rotate
      this.cubeRotation * 0.3, // amount to rotate in radians
      [1, 0, 0],
    ); // axis to rotate around (X)
    {
      const numComponents = 3; // pull out 2 values per iteration
      const type = this.context.FLOAT; // the data in the buffer is 32bit floats
      const normalize = false; // don't normalize
      const stride = 0; // how many bytes to get from one set of values to the next
      // 0 = use type and numComponents above

      const offset = 0; // how many bytes inside the buffer to start from
      this.context.vertexAttribPointer(
        this.programInfo.attribLocations.vertexPosition,
        numComponents,
        type,
        normalize,
        stride,
        offset,
      );
      this.context.enableVertexAttribArray(
        this.programInfo.attribLocations.vertexPosition,
      );
    }

    const buffers = this.initBuffers();
    // Tell WebGL how to pull out the positions from the position
    // buffer into the vertexPosition attribute
    {
      const numComponents = 3;
      const type = this.context.FLOAT;
      const normalize = false;
      const stride = 0;
      const offset = 0;
      this.context.bindBuffer(this.context.ARRAY_BUFFER, buffers.position);
      this.context.vertexAttribPointer(
        this.programInfo.attribLocations.vertexPosition,
        numComponents,
        type,
        normalize,
        stride,
        offset,
      );
      this.context.enableVertexAttribArray(
        this.programInfo.attribLocations.vertexPosition,
      );
    }

    // Tell WebGL how to pull out the colors from the color buffer
    // into the vertexColor attribute.
    {
      const numComponents = 4;
      const type = this.context.FLOAT;
      const normalize = false;
      const stride = 0;
      const offset = 0;
      this.context.bindBuffer(this.context.ARRAY_BUFFER, buffers.color);
      this.context.vertexAttribPointer(
        this.programInfo.attribLocations.vertexColor,
        numComponents,
        type,
        normalize,
        stride,
        offset,
      );
      this.context.enableVertexAttribArray(
        this.programInfo.attribLocations.vertexColor,
      );
    }

    // Tell WebGL which indices to use to index the vertices
    this.context.bindBuffer(this.context.ELEMENT_ARRAY_BUFFER, buffers.indices);
    // Tell WebGL to use our program when drawing

    this.context.useProgram(this.programInfo.program);

    // Set the shader uniforms

    this.context.uniformMatrix4fv(
      this.programInfo.uniformLocations.projectionMatrix,
      false,
      projectionMatrix,
    );
    this.context.uniformMatrix4fv(
      this.programInfo.uniformLocations.modelViewMatrix,
      false,
      modelViewMatrix,
    );

    {
      const vertexCount = 36;
      const type = this.context.UNSIGNED_SHORT;
      const offset = 0;
      this.context.drawElements(
        this.context.TRIANGLES,
        vertexCount,
        type,
        offset,
      );
    }
    this.cubeRotation += deltaTime;
  }
  clear() {
    this.context.clear(
      this.context.COLOR_BUFFER_BIT | this.context.DEPTH_BUFFER_BIT,
    );
  }
}
