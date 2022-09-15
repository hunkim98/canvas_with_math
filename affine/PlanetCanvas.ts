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
import { addVectors, subtractVectors } from "../utils/vectorFunctions";
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
  private fps = 24;
  private sunVectors: Vector2d[];
  private earthVectors: Vector2d[];
  private sunEarthDistance = 100;
  private earthMoonDistance = 30;
  private earthOrigin: Vector2d = [this.sunEarthDistance, 0];
  private moonOrigin: Vector2d = [
    this.sunEarthDistance + this.earthMoonDistance,
    0,
  ];
  private sunRadius = 25;
  private earthRadius = 8;
  private moonRadius = 4;
  private sunEarthAngle = 0;
  private earthMoonAngle = 0;
  private moonVectors: Vector2d[];
  private deltaSunEarthAngle = Math.PI / 100;
  private deltaEarthMoonAngle = Math.PI / 15;

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
    this.sunVectors = createCircleVectors(this.sunRadius);
    this.earthVectors = createCircleVectors(this.earthRadius);
    this.moonVectors = createCircleVectors(this.moonRadius);
    //requesting animation
    this.updateFrame();
  }

  updateFrame() {
    this.clear();
    // this.drawAll();
    this.drawBackground();
    this.drawWithCartesianOrigin(this.drawAll.bind(this));
    setTimeout(() => {
      requestAnimationFrame(this.updateFrame.bind(this));
    }, 1000 / this.fps);
  }

  drawSun() {
    for (const vector of this.sunVectors) {
      drawPoint(this.context, vector, { r: 255, g: 200, b: 0, a: 1 });
    }
  }

  drawAll() {
    //draw sun
    this.drawSun();

    //draw earth
    this.drawEarth();

    //draw moon
    this.drawMoon();

    this.sunEarthAngle += this.deltaSunEarthAngle;
    this.earthMoonAngle += this.deltaEarthMoonAngle;
    this.earthOrigin = multiplyMatrixWithVector(
      createRotateMatrix(this.deltaSunEarthAngle),
      this.earthOrigin
    ) as Vector2d;
  }

  drawEarth() {
    const tempEarthVectors = createCircleVectors(this.earthRadius);
    const earthTranslateAffineMatrix = createAffineTranslateMatrix([
      this.sunEarthDistance,
      0,
    ]);
    const earthRotateAffineMatrix = createAffineRotateMatrix(
      createRotateMatrix(this.sunEarthAngle)
    );
    const earthCombinedAffineMatrix = multiplyMatrices(
      earthRotateAffineMatrix,
      earthTranslateAffineMatrix
    );
    this.earthVectors = tempEarthVectors.map((vector) => {
      const affineVector = vectorToAffineVector(vector);
      const transformedAffineVector = multiplyMatrixWithVector(
        earthCombinedAffineMatrix,
        affineVector
      );
      return affineVectorToVector(transformedAffineVector) as Vector2d;
    });
    for (const vector of this.earthVectors) {
      drawPoint(this.context, vector, { r: 0, g: 255, b: 0, a: 1 });
    }
  }

  drawMoon() {
    const tempMoonVectors = createCircleVectors(this.moonRadius);
    const moonTranslateAffineMatrix = createAffineTranslateMatrix([
      this.earthMoonDistance,
      0,
    ]);
    const moonRotateAffineMatrix = createAffineRotateMatrix(
      createRotateMatrix(this.earthMoonAngle)
    );
    const moonCombinedAffineMatrix = multiplyMatrices(
      createAffineTranslateMatrix(this.earthOrigin),
      multiplyMatrices(moonRotateAffineMatrix, moonTranslateAffineMatrix)
    );
    this.moonVectors = tempMoonVectors.map((vector) => {
      const affineVector = vectorToAffineVector(vector);
      const transformedAffineVector = multiplyMatrixWithVector(
        moonCombinedAffineMatrix,
        affineVector
      );
      return affineVectorToVector(transformedAffineVector) as Vector2d;
    });

    for (const vector of this.moonVectors) {
      drawPoint(this.context, vector, { r: 255, g: 250, b: 205, a: 1 });
    }
  }

  drawWithCartesianOrigin(renderFunction: Function) {
    this.context.save();
    this.context.transform(1, 0, 0, -1, this.width / 2, this.height / 2);
    renderFunction();
    this.context.restore();
  }

  drawBackground(color?: string) {
    this.context.fillStyle = "black";
    this.context.fillRect(0, 0, this.width, this.height);
  }

  clear() {
    this.context.clearRect(0, 0, this.width, this.height);
  }
}
