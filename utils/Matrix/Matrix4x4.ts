import { Vector4 } from "../vector/Vector4";

export class Matrix4 {
  vectors: Vector4[];
  constructor(v1: Vector4, v2: Vector4, v3: Vector4, v4: Vector4) {
    this.vectors = [v1, v2, v3, v4];
  }
}
