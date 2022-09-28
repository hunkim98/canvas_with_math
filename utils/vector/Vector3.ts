//https://evanw.github.io/lightgl.js/docs/vector.html

import { Vector4 } from "./Vector4";

export class Vector3 {
  x: number;
  y: number;
  z: number;
  constructor(x: number, y: number, z: number) {
    this.x = x || 0;
    this.y = y || 0;
    this.z = z || 0;
  }
  add(v: Vector3) {
    return new Vector3(this.x + v.x, this.y + v.y, this.z + v.z);
  }
  subtract(v: Vector3) {
    return new Vector3(this.x - v.x, this.y - v.y, this.z - v.z);
  }
  negative(): Vector3 {
    return new Vector3(-this.x, -this.y, -this.z);
  }
  dot(v: Vector3): number {
    return this.x * v.x + this.y * v.y + this.z * v.z;
  }
  clone(): Vector3 {
    return new Vector3(this.x, this.y, this.z);
  }
  length() {
    return Math.sqrt(this.dot(this));
  }
  scalarBy(n: number) {
    return new Vector3(this.x * n, this.y * n, this.z * n);
  }
  equals(v: Vector3) {
    return this.x === v.x && this.y === v.y && this.z === v.z;
  }
  toAffine(isPoint: boolean): Vector4 {
    return new Vector4(this.x, this.y, this.z, isPoint ? 1 : 0);
  }
  toArray(): Array<number> {
    return [this.x, this.y, this.z];
  }
}
