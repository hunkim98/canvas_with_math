import { Vector2 } from "../../vector/Vector2";
import { LinearColor } from "../Math/LinearColor";

export class Vertex2D {
  position: Vector2;
  color: LinearColor;
  UV: Vector2;
  constructor(inPosition: Vector2, color: LinearColor, UV: Vector2) {
    this.position = inPosition;
    this.color = color;
    this.UV = UV;
  }

  scalarBy(inScalar: number) {
    return new Vertex2D(
      this.position.scalarBy(inScalar),
      this.color.scalarBy(inScalar),
      this.UV.scalarBy(inScalar),
    );
  }

  add(inVector: Vertex2D) {
    return new Vertex2D(
      this.position.add(inVector.position),
      this.color.add(inVector.color),
      this.UV.add(inVector.UV),
    );
  }
}
