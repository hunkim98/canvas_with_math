import { Vector3 } from "../vector/Vector3";

export class Matrix3x3 {
  vectors: Vector3[];
  constructor(v1: Vector3, v2: Vector3, v3: Vector3) {
    this.vectors = [v1, v2, v3];
  }
}
