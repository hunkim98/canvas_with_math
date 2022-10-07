import { Vector3 } from "../../vector/Vector3";
import { Vector4 } from "../../vector/Vector4";
import { Matrix4x4 } from "../Math/Matrix4x4";
import { TransformComponent } from "./TransformComponent";

export class CameraObject {
  transform: TransformComponent;
  constructor() {
    this.transform = new TransformComponent();
  }

  getViewAxes() {
    return {
      OutViewX: this.transform.getLocalX(),
      OutViewY: this.transform.getLocalY(),
      OutViewZ: this.transform.getLocalZ(),
    };
  }

  getViewMatrix() {
    const { OutViewX, OutViewY, OutViewZ } = this.getViewAxes();
    //pos is the current camera location
    const pos = this.transform.position;
    return new Matrix4x4(
      new Vector3(OutViewX.x, OutViewY.x, OutViewZ.x).toAffine(false),
      new Vector3(OutViewX.y, OutViewY.y, OutViewZ.y).toAffine(false),
      new Vector3(OutViewX.z, OutViewY.z, OutViewZ.z).toAffine(false),
      new Vector3(
        -OutViewX.dot(pos),
        -OutViewY.dot(pos),
        -OutViewZ.dot(pos)
      ).toAffine(true)
    );
  }

  //this does not care the offset of the camera
  getViewMatrixRotationOnly() {
    const { OutViewX, OutViewY, OutViewZ } = this.getViewAxes();
    return new Matrix4x4(
      new Vector3(OutViewX.x, OutViewY.x, OutViewZ.x).toAffine(false),
      new Vector3(OutViewX.y, OutViewY.y, OutViewZ.y).toAffine(false),
      new Vector3(OutViewX.z, OutViewY.z, OutViewZ.z).toAffine(false),
      Vector4.UnitZ
    );
  }
}
