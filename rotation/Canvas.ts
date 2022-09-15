import { Vector2d } from "../types/vector";
import { TransformToCartesian2d } from "../utils/cartesian";
import { rotateVector2d } from "../utils/tranform2d";

export default class Canvas {
  private canvas: HTMLCanvasElement;
  private context: CanvasRenderingContext2D;
  private width: number;
  private height: number;
  private fps = 60;
  private vectors: Array<Vector2d>;
  private frameCount = 0;
  private initialVector: Vector2d = [70, 0];

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
    this.vectors = [[5, 5]];
    console.log("canvas has been set!");
    //requesting animation
    this.updateFrame();
  }

  updateFrame() {
    this.clear();
    this.drawWithCartesianOrigin(this.drawAll.bind(this));
    setTimeout(() => {
      requestAnimationFrame(this.updateFrame.bind(this));
    }, 1000 / this.fps);
    this.frameCount++;
  }

  drawAll() {
    const newVector = rotateVector2d(this.initialVector, Math.PI / 100);
    this.drawDot(...newVector);
    this.initialVector = newVector;
  }

  drawWithCartesianOrigin(renderFunction: Function) {
    this.context.save();
    this.context.transform(1, 0, 0, -1, this.width / 2, this.height / 2);
    renderFunction();
    this.context.restore();
  }

  drawVector(x: number, y: number) {
    console.log(this.initialVector);
  }

  drawDot(x: number, y: number) {
    this.context.beginPath();
    this.context.arc(x, y, 5, 0, 2 * Math.PI, true);
    this.context.fill();
    this.context.closePath();
    this.context.restore();
  }

  drawBackground(color?: string) {
    this.context.fillStyle = "red";
    this.context.fillRect(0, 0, this.width, this.height);
    this.context.restore();
  }

  clear() {
    this.context.clearRect(0, 0, this.width, this.height);
  }
}
