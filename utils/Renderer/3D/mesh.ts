import { Vector2 } from "../../vector/Vector2";
import { Vector3 } from "../../vector/Vector3";
import { LinearColor } from "../Math/LinearColor";

export class Mesh3D {
  vertices: Array<Vector3>;
  indices: Array<number>;
  color: Array<LinearColor>;
  UVs: Array<Vector2>;
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
}
