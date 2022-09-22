import { Matrix } from "../types/matrix";
import { Vector2d } from "../types/vector";
import {
  affineVectorToVector,
  createAffineRotateMatrix,
  createAffineTranslateMatrix,
  vectorToAffineVector,
} from "../utils/affine";
import { TransformToCartesian2d } from "../utils/cartesian";
import {
  multiplyMatrices,
  multiplyMatrixWithVector,
} from "../utils/matrixFunctions";
import { rotateVector2d, createRotateMatrix } from "../utils/tranform2d";
import { addVectors } from "../utils/vectorFunctions";
import {
  createCircleVectors,
  createRectVectors,
  drawCartesianPoint,
  drawCartesianLineByContext,
  drawPoint,
  drawLine,
} from "../utils/vectorShapes";

export default class Canvas {
  private canvas: HTMLCanvasElement;
  private context: CanvasRenderingContext2D;
  private width: number;
  private height: number;
  private fps = 60;
  private origin: Vector2d = [0, 0];
  private degree: number = 0;
  private rectVectors: Vector2d[];
  private isDirectionChanged: boolean;
  private vertexCount = 4;
  private triangleCount = 2;
  private squareHalfSize = 30;

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
    this.rectVectors = createRectVectors(50, 50);
    //requesting animation
    this.isDirectionChanged = false;
    this.updateFrame();
  }

  updateFrame() {
    this.clear();
    // this.drawAll();
    this.drawAll();
    setTimeout(() => {
      requestAnimationFrame(this.updateFrame.bind(this));
    }, 1000 / this.fps);
  }

  drawMesh2D() {
    const rawVertices: Vector2d[] = [
      [-this.squareHalfSize, -this.squareHalfSize],
      [-this.squareHalfSize, this.squareHalfSize],
      [this.squareHalfSize, this.squareHalfSize],
      [this.squareHalfSize, -this.squareHalfSize],
    ];
    const indices = [0, 1, 2, 0, 2, 3];
    for (let ti = 0; ti < this.triangleCount; ti++) {
      const bi = ti * 3;
      drawLine(
        this.canvas,
        rawVertices[indices[bi]],
        rawVertices[indices[bi + 1]]
      );
      drawLine(
        this.canvas,
        rawVertices[indices[bi]],
        rawVertices[indices[bi + 2]]
      );
      drawLine(
        this.canvas,
        rawVertices[indices[bi + 1]],
        rawVertices[indices[bi + 2]]
      );
    }
  }

  drawAll() {
    // we move only x axis
    this.drawMesh2D();
  }

  drawWithCartesianOrigin(renderFunction: Function) {
    this.context.save();
    this.context.transform(1, 0, 0, -1, this.width / 2, this.height / 2);
    renderFunction();
    this.context.restore();
  }

  clear() {
    this.context.clearRect(0, 0, this.width, this.height);
  }
}
