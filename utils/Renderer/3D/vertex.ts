import { Vector2 } from "../../vector/Vector2";
import { Vector4 } from "../../vector/Vector4";
import { LinearColor } from "../Math/LinearColor";

export class Vertex3D {
  position: Vector4;
  color: LinearColor;
  UV: Vector2;
  constructor(
    inPosition: Vector4,
    color: LinearColor = LinearColor.Black,
    UV: Vector2 = new Vector2(1, 1)
  ) {
    this.position = inPosition;
    this.color = color;
    this.UV = UV;
  }

  add(inVector: Vertex3D) {
    return new Vertex3D(
      this.position.add(inVector.position),
      this.color.add(inVector.color),
      this.UV.add(inVector.UV)
    );
  }

  scalarBy(inScalar: number) {
    return new Vertex3D(
      this.position.scalarBy(inScalar),
      this.color.scalarBy(inScalar),
      this.UV.scalarBy(inScalar)
    );
  }
}
