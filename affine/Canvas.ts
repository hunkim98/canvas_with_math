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
  drawPoint,
} from "../utils/vectorShapes";

export default class Canvas {
  private canvas: HTMLCanvasElement;
  private context: CanvasRenderingContext2D;
  private width: number;
  private height: number;
  private fps = 60;
  private origin: Vector2d = [0, 0];
  private degree: number;
  private rectVectors: Vector2d[];
  private isDirectionChanged: boolean;

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
    this.degree = 0;
  }

  updateFrame() {
    this.clear();
    // this.drawAll();
    this.drawWithCartesianOrigin(this.drawAll.bind(this));
    setTimeout(() => {
      requestAnimationFrame(this.updateFrame.bind(this));
    }, 1000 / this.fps);
  }

  drawAll() {
    // we move only x axis
    const deltaTransformVector: Vector2d = this.isDirectionChanged
      ? [-1, 0]
      : [1, 0];
    const tempRectVectors = createRectVectors(50, 50);
    this.origin = addVectors(this.origin, deltaTransformVector) as Vector2d;
    if (this.origin[0] > 80) {
      this.isDirectionChanged = true;
      console.log("going left");
    }
    if (this.origin[0] < -80) {
      this.isDirectionChanged = false;
      console.log("going right");
    }

    this.degree = this.isDirectionChanged
      ? this.degree + Math.PI / 100
      : this.degree - Math.PI / 100;
    const rotateMatrix: Matrix = createRotateMatrix(this.degree);
    const transformAffineMatrix = createAffineTranslateMatrix(this.origin);
    const rotateAffineMatrix = createAffineRotateMatrix(rotateMatrix);
    const combinedAffineTransformMatrix = multiplyMatrices(
      transformAffineMatrix,
      rotateAffineMatrix
    );
    //mutate original array
    this.rectVectors = tempRectVectors.map((vector) => {
      const affineVector = vectorToAffineVector(vector);
      const transformedAffineVector = multiplyMatrixWithVector(
        combinedAffineTransformMatrix,
        affineVector
      );
      return affineVectorToVector(transformedAffineVector) as Vector2d;
    });
    for (const vector of this.rectVectors) {
      drawPoint(this.context, vector, { r: 255, g: 0, b: 0, a: 1 });
    }
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
