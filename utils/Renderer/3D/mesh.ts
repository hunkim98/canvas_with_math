import { Vector2 } from "../../vector/Vector2";
import { Vector3 } from "../../vector/Vector3";
import { LinearColor } from "../Math/LinearColor";

export class Mesh3D {
  private vertices: Array<Vector3>;
  private indices: Array<number>;
  private color: Array<LinearColor>;
  private UVs: Array<Vector2>;
  constructor(
    vertices: Array<Vector3>,
    indices: Array<number>,
    color?: Array<LinearColor>,
    UVs?: Array<Vector2>,
  ) {
    this.vertices = vertices;
    this.indices = indices;
    this.color = color ? color : [];
    this.UVs = UVs ? UVs : [];
  }

  getVertices() {
    return this.vertices;
  }

  getIndices() {
    return this.indices;
  }

  getColors() {
    return this.color;
  }

  getUVs() {
    return this.UVs;
  }
}
