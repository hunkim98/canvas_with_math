import { Vector2d } from "../types/vector";
import { TransformToCartesian2d } from "../utils/cartesian";
import { rotateVector2d } from "../utils/tranform2d";
import { initShaderProgram } from "../utils/Webgl/shaders";
import { mat4 } from "gl-matrix";

export default class Canvas {
  private canvas: HTMLCanvasElement;
  private context: WebGLRenderingContext;
  private width: number;
  private height: number;
  private fps = 60;
  private frameCount = 0;
  private initialVector: Vector2d = [70, 0];
  private shaderProgram: WebGLProgram;
  private buffers: { position: WebGLBuffer | null };
  private programInfo: {
    program: WebGLProgram;
    attribLocations: {
      vertexPosition: number;
    };
    uniformLocations: {
      projectionMatrix: WebGLUniformLocation;
      modelViewMatrix: WebGLUniformLocation;
    };
  };
  vsSource = `
  attribute vec4 aVertexPosition;

  uniform mat4 uModelViewMatrix;
  uniform mat4 uProjectionMatrix;

  void main() {
    gl_Position = uProjectionMatrix * uModelViewMatrix * aVertexPosition;
  }
`;
  fsSource = `
    void main() {
    gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);
    }
`;
  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.context = canvas.getContext("webgl")!;
    this.canvas.style.border = "1px solid black";
    this.width = 300;
    this.height = 300;
    this.canvas.width = this.width;
    this.canvas.height = this.height;
    this.canvas.style.width = `${this.width}px`;
    this.canvas.style.height = `${this.height}px`;
    this.buffers = this.initBuffers();
    this.shaderProgram = initShaderProgram(
      this.context,
      this.vsSource,
      this.fsSource
    )!;
    this.programInfo = {
      program: this.shaderProgram,
      attribLocations: {
        vertexPosition: this.context.getAttribLocation(
          this.shaderProgram,
          "aVertexPosition"
        ),
      },
      uniformLocations: {
        projectionMatrix: this.context.getUniformLocation(
          this.shaderProgram,
          "uProjectionMatrix"
        )!,
        modelViewMatrix: this.context.getUniformLocation(
          this.shaderProgram,
          "uModelViewMatrix"
        )!,
      },
    };
    console.log("canvas has been set!");
    //requesting animation
    this.updateFrame();
  }

  updateFrame() {
    // this.clear();
    // setTimeout(() => {
    //   requestAnimationFrame(this.updateFrame.bind(this));
    // }, 1000 / this.fps);
    // this.frameCount++;
    this.drawScene();
  }

  createBuffer() {
    const positionBuffer = this.context.createBuffer();
    this.context.bindBuffer(this.context.ARRAY_BUFFER, positionBuffer);

    const positions = [1.0, 1.0, -1.0, 1.0, 1.0, -1.0, -1.0, -1.0];
    this.context.bufferData(
      this.context.ARRAY_BUFFER,
      new Float32Array(positions),
      this.context.STATIC_DRAW
    );
    return {
      postion: positionBuffer,
    };
  }
  initBuffers() {
    // Create a buffer for the square's positions.

    const positionBuffer = this.context.createBuffer();

    // Select the positionBuffer as the one to apply buffer
    // operations to from here out.

    this.context.bindBuffer(this.context.ARRAY_BUFFER, positionBuffer);

    // Now create an array of positions for the square.

    const positions = [1.0, 1.0, -1.0, 1.0, 1.0, -1.0, -1.0, -1.0];

    // Now pass the list of positions into WebGL to build the
    // shape. We do this by creating a Float32Array from the
    // JavaScript array, then use it to fill the current buffer.

    this.context.bufferData(
      this.context.ARRAY_BUFFER,
      new Float32Array(positions),
      this.context.STATIC_DRAW
    );

    return {
      position: positionBuffer,
    };
  }
  drawScene() {
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

    mat4.translate(modelViewMatrix, modelViewMatrix, [-0.0, 0.0, -6.0]);
    {
      const numComponents = 2; // pull out 2 values per iteration
      const type = this.context.FLOAT; // the data in the buffer is 32bit floats
      const normalize = false; // don't normalize
      const stride = 0; // how many bytes to get from one set of values to the next
      // 0 = use type and numComponents above
      const offset = 0; // how many bytes inside the buffer to start from
      this.context.bindBuffer(this.context.ARRAY_BUFFER, this.buffers.position);
      this.context.vertexAttribPointer(
        this.programInfo.attribLocations.vertexPosition,
        numComponents,
        type,
        normalize,
        stride,
        offset
      );
      this.context.enableVertexAttribArray(
        this.programInfo.attribLocations.vertexPosition
      );
    }

    // Tell WebGL to use our program when drawing

    this.context.useProgram(this.programInfo.program);

    // Set the shader uniforms

    this.context.uniformMatrix4fv(
      this.programInfo.uniformLocations.projectionMatrix,
      false,
      projectionMatrix
    );
    this.context.uniformMatrix4fv(
      this.programInfo.uniformLocations.modelViewMatrix,
      false,
      modelViewMatrix
    );

    {
      const offset = 0;
      const vertexCount = 4;
      this.context.drawArrays(this.context.TRIANGLE_STRIP, offset, vertexCount);
    }
  }
  clear() {
    this.context.clear(
      this.context.COLOR_BUFFER_BIT | this.context.DEPTH_BUFFER_BIT
    );
  }
}
