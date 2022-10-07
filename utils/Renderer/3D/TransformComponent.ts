import { Vector3 } from "../../vector/Vector3";
import { Vector4 } from "../../vector/Vector4";
import { Matrix4x4 } from "../Math/Matrix4x4";
import { Rotator } from "../Math/Rotator";

export class TransformComponent {
  position: Vector3 = Vector3.Zero;
  rotation: Rotator = new Rotator();
  scale: Vector3 = Vector3.One;
  right: Vector3 = Vector3.UnitX;
  up: Vector3 = Vector3.UnitY;
  forward: Vector3 = Vector3.UnitZ;
  constructor() {}

  addYawRotation(InDegree: number) {
    this.rotation.Yaw += InDegree;
  }

  update() {
    this.rotation.clamp();
    const { OutRight, OutUp, OutForward } = this.rotation.getLocalAxes();
    this.right = OutRight;
    this.up = OutUp;
    this.forward = OutForward;
  }

  setLocalAxes(inRight: Vector3, inUp: Vector3, inForward: Vector3) {
    this.right = inRight;
    this.up = inUp;
    this.forward = inForward;
  }

  setScale(inScale: Vector3) {
    this.scale = inScale;
  }

  getModelingMatrix() {
    return new Matrix4x4(
      this.right.scalarBy(this.scale.x).toAffine(false),
      this.up.scalarBy(this.scale.y).toAffine(false),
      this.forward.scalarBy(this.scale.z).toAffine(false),
      this.position.toAffine(true)
    );
  }

  getLocalX() {
    return this.right;
  }

  getLocalY() {
    return this.up;
  }

  getLocalZ() {
    return this.forward;
  }
}
