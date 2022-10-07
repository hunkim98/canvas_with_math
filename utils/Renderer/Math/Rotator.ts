import { Vector3 } from "../../vector/Vector3";
import { degreeToRadian } from "./functions";
import { Matrix3x3 } from "./Matrix3x3";

export class Rotator {
  Yaw: number;
  Roll: number;
  Pitch: number;
  static getAxisClampedValue(InRotatorValue: number) {
    let angle = InRotatorValue % 360;
    if (angle < 0) {
      angle += 360;
    }

    return angle;
  }
  constructor(InYaw: number = 0, InRoll: number = 0, InPitch: number = 0) {
    this.Yaw = Rotator.getAxisClampedValue(InYaw);
    this.Roll = Rotator.getAxisClampedValue(InRoll);
    this.Pitch = Rotator.getAxisClampedValue(InPitch);
  }
  clamp() {
    this.Yaw = Rotator.getAxisClampedValue(this.Yaw);
    this.Roll = Rotator.getAxisClampedValue(this.Roll);
    this.Pitch = Rotator.getAxisClampedValue(this.Pitch);
  }

  toRadian() {
    this.clamp();
    return {
      Yaw: (this.Yaw * Math.PI) / 180,
      Roll: (this.Roll * Math.PI) / 180,
      Pitch: (this.Pitch * Math.PI) / 180,
    };
  }

  //회전행렬의 유도
  //we will compute the rotation matrix by roll - pitch - yaw
  //thus R = R(yaw) * R(pitch) * R(roll)
  getLocalAxes() {
    //this is radian value
    const { Yaw, Roll, Pitch } = this.toRadian();
    //x-axis rotation - pitch rotate
    const Rpitch = new Matrix3x3(
      Vector3.UnitX,
      new Vector3(0, Math.cos(Pitch), Math.sin(Pitch)),
      new Vector3(0, -Math.sin(Pitch), Math.cos(Pitch))
    );
    //y-axis rotation - yaw rotate
    const Ryaw = new Matrix3x3(
      new Vector3(Math.cos(Yaw), 0, -Math.sin(Yaw)),
      Vector3.UnitY,
      new Vector3(Math.sin(Yaw), 0, Math.cos(Yaw))
    );
    //z-axis rotation - roll rotate
    const Rroll = new Matrix3x3(
      new Vector3(Math.cos(Roll), Math.sin(Roll), 0),
      new Vector3(-Math.sin(Roll), Math.cos(Roll), 0),
      Vector3.UnitZ
    );
    const RotateMatrix = Ryaw.multiplyMatrix(Rpitch).multiplyMatrix(Rroll);
    return {
      OutRight: RotateMatrix.Cols[0], //how the matrix will change
      OutUp: RotateMatrix.Cols[1],
      OutForward: RotateMatrix.Cols[2],
    };
  }
}
