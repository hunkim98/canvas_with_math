//https://evanw.github.io/lightgl.js/docs/vector.html

import { Vector3 } from "./Vector3";

export class Vector2 {
  x: number;
  y: number;

  static One = new Vector2(1, 1);
  static Zero = new Vector2(0, 0);
  static UnitX = new Vector2(1, 0);
  static UnitY = new Vector2(0, 1);
  constructor(x: number, y: number) {
    this.x = x || 0;
    this.y = y || 0;
  }
  add(v: Vector2) {
    return new Vector2(this.x + v.x, this.y + v.y);
  }
  subtract(v: Vector2) {
    return new Vector2(this.x - v.x, this.y - v.y);
  }
  negative(): Vector2 {
    return new Vector2(-this.x, -this.y);
  }
  dot(v: Vector2): number {
    return this.x * v.x + this.y * v.y;
  }
  clone(): Vector2 {
    return new Vector2(this.x, this.y);
  }
  crossProduct(v: Vector2): Vector2 {
    return new Vector2(this.x * v.y - this.y * v.x, 0);
  }
  length() {
    return Math.sqrt(this.dot(this));
  }
  scalarBy(n: number) {
    return new Vector2(this.x * n, this.y * n);
  }
  equals(v: Vector2) {
    return this.x === v.x && this.y === v.y;
  }
  toAffine(isPoint: boolean): Vector3 {
    return new Vector3(this.x, this.y, isPoint ? 1 : 0);
  }
  toArray(): Array<number> {
    return [this.x, this.y];
  }
  normalize() {
    return this.scalarBy(1 / this.length());
  }
  toScreenPointVector(): Vector2 {
    return new Vector2(Math.floor(this.x), Math.floor(this.y));
  }
}
