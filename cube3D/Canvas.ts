import { Vector2d } from "../types/vector";
import { TransformToCartesian2d } from "../utils/cartesian";
import { rotateVector2d } from "../utils/tranform2d";
import { initShaderProgram } from "../utils/Webgl/shaders";
import { mat4 } from "gl-matrix";

export default class Canvas {
  private canvas: HTMLCanvasElement;
  private context: CanvasRenderingContext2D;
  private width: number;
  private height: number;
  private fps = 60;
  private frameCount = 0;

  private cubeRotation: number = 0;
  private then: number = 0;

  //we use an interpolator - it automatically makes a gradient between colors

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.context = canvas.getContext("2d")!;
    this.canvas.style.border = "1px solid black";
    this.width = 300;
    this.height = 300;
    this.canvas.width = this.width;
    this.canvas.height = this.height;
    this.canvas.style.width = `${this.width}px`;
    this.canvas.style.height = `${this.height}px`;
    console.log("canvas has been set!");
    //requesting animation
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
  }
  drawScene(deltaTime: number) {}
  clear() {
    this.context.clearRect(0, 0, this.width, this.height);
  }
}
