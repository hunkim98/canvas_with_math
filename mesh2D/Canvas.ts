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
import { toScreenPointVector } from "../utils/screen";
import { rotateVector2d, createRotateMatrix } from "../utils/tranform2d";
import { addVectors, dotVectors } from "../utils/vectorFunctions";
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
  private isColored: boolean = false;
  private mode: "Mesh" | "Surface" = "Mesh";
  private triangleCount = 2;
  private squareHalfSize = 30;
  private rawVertices: Vector2d[] = [
    [-this.squareHalfSize - 100, -this.squareHalfSize],
    [-this.squareHalfSize, this.squareHalfSize],
    [this.squareHalfSize, this.squareHalfSize],
    [this.squareHalfSize + 100, -this.squareHalfSize],
  ];

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

  toggleColorMode() {
    this.isColored = !this.isColored;
  }

  updateFrame() {
    this.clear();
    // this.drawAll();
    this.drawAll();
    setTimeout(() => {
      requestAnimationFrame(this.updateFrame.bind(this));
    }, 1000 / this.fps);
  }

  drawColoredMesh2d() {
    const indices = [0, 1, 2, 0, 2, 3];
    for (let ti = 0; ti < this.triangleCount; ti++) {
      const bi = ti * 3;
      const tv: Vector2d[] = [
        this.rawVertices[indices[bi]],
        this.rawVertices[indices[bi + 1]],
        this.rawVertices[indices[bi + 2]],
      ];
      const minPos: Vector2d = [
        Math.min(tv[0][0], tv[1][0], tv[2][0]),
        Math.min(tv[0][1], tv[1][1], tv[2][1]),
      ];
      const maxPos: Vector2d = [
        Math.max(tv[0][0], tv[1][0], tv[2][0]),
        Math.max(tv[0][1], tv[1][1], tv[2][1]),
      ];

      const u = addVectors(
        tv[1],
        tv[0].map(element => -element),
      );
      const v = addVectors(
        tv[2],
        tv[0].map(element => -element),
      );
      const udotv = dotVectors(u, v);
      const vdotv = dotVectors(v, v);
      const udotu = dotVectors(u, u);
      const denominator = udotv * udotv - vdotv * udotu;
      if (denominator === 0) {
        continue;
      }
      const invDenominator = 1 / denominator;
      const lowerLeftPoint = toScreenPointVector(minPos);
      const upperRightPoint = toScreenPointVector(maxPos);
      lowerLeftPoint[0] = Math.max(-this.canvas.width / 2, lowerLeftPoint[0]);
      lowerLeftPoint[1] = Math.max(-this.canvas.height / 2, lowerLeftPoint[1]);
      upperRightPoint[0] = Math.min(this.canvas.width / 2, upperRightPoint[0]);
      upperRightPoint[1] = Math.min(this.canvas.height / 2, upperRightPoint[1]);

      for (let x = lowerLeftPoint[0]; x <= upperRightPoint[0]; ++x) {
        for (let y = lowerLeftPoint[1]; y <= upperRightPoint[1]; ++y) {
          const pointToTest = [x, y];
          const w = addVectors(
            pointToTest,
            tv[0].map(element => -element),
          );
          const wdotu = dotVectors(w, u);
          const wdotv = dotVectors(w, v);

          const s = (wdotv * udotv - wdotu * vdotv) * invDenominator;
          const t = (wdotu * udotv - wdotv * udotu) * invDenominator;
          const oneMinusST = 1 - s - t;
          if (
            s >= 0 &&
            s <= 1 &&
            t >= 0 &&
            t <= 1 &&
            oneMinusST >= 0 &&
            oneMinusST <= 1
          ) {
            drawCartesianPoint(this.canvas, [x, y], {
              r: 255,
              g: 0,
              b: 0,
              a: 255,
            });
          }
        }
      }
    }
  }

  drawMesh2D() {
    const indices = [0, 1, 2, 0, 2, 3];
    for (let ti = 0; ti < this.triangleCount; ti++) {
      const bi = ti * 3;
      drawLine(
        this.canvas,
        this.rawVertices[indices[bi]],
        this.rawVertices[indices[bi + 1]],
      );
      drawLine(
        this.canvas,
        this.rawVertices[indices[bi]],
        this.rawVertices[indices[bi + 2]],
      );
      drawLine(
        this.canvas,
        this.rawVertices[indices[bi + 1]],
        this.rawVertices[indices[bi + 2]],
      );
    }
  }

  drawAll() {
    // we move only x axis
    if (this.isColored) {
      this.drawColoredMesh2d();
    } else {
      this.drawMesh2D();
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
