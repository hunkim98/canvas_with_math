import { Vector2 } from "./Vector2";
import { Vector3 } from "./Vector3";

//this is also an affine vector for vector3
export class Vector4 {
  x: number;
  y: number;
  z: number;
  w: number;

  static One = new Vector4(1, 1, 1, 1);
  static Zero = new Vector4(0, 0, 0, 0);
  static UnitX = new Vector4(1, 0, 0, 0);
  static UnitY = new Vector4(0, 1, 0, 0);
  static UnitZ = new Vector4(0, 0, 1, 0);
  static UnitW = new Vector4(0, 0, 0, 1);

  constructor(x: number, y: number, z: number, w: number) {
    this.x = x || 0;
    this.y = y || 0;
    this.z = z || 0;
    this.w = w || 0;
  }
  add(v: Vector4) {
    return new Vector4(this.x + v.x, this.y + v.y, this.z + v.z, this.w + v.w);
  }
  subtract(v: Vector4) {
    return new Vector4(this.x - v.x, this.y - v.y, this.z - v.z, this.w - v.w);
  }
  negative(): Vector4 {
    return new Vector4(-this.x, -this.y, -this.z, -this.w);
  }
  dot(v: Vector4): number {
    return this.x * v.x + this.y * v.y + this.z * v.z + this.w * v.w;
  }
  clone(): Vector4 {
    return new Vector4(this.x, this.y, this.z, this.w);
  }
  length() {
    return Math.sqrt(this.dot(this));
  }
  scalarBy(n: number) {
    return new Vector4(this.x * n, this.y * n, this.z * n, this.w * n);
  }
  equals(v: Vector4) {
    return this.x === v.x && this.y === v.y && this.z === v.z && this.w === v.w;
  }
  toArray(): Array<number> {
    return [this.x, this.y, this.z, this.w];
  }
  toVector2() {
    return new Vector2(this.x, this.y);
  }

  toVector3() {
    return new Vector3(this.x, this.y, this.z);
  }
  normalize() {
    return this.scalarBy(1 / this.length());
  }
}
