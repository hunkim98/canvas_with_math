import { Vector3 } from "../../vector/Vector3";
import { Vector4 } from "../../vector/Vector4";
import { Matrix3x3 } from "./Matrix3x3";

export class Matrix4x4 {
  Cols: Array<Vector4>;

  static Identity: Array<Vector4> = [
    Vector4.UnitX,
    Vector4.UnitY,
    Vector4.UnitZ,
    Vector4.UnitW,
  ];
  constructor(
    InCol0: Vector4 = Vector4.UnitX,
    InCol1: Vector4 = Vector4.UnitY,
    InCol2: Vector4 = Vector4.UnitZ,
    InCol3: Vector4 = Vector4.UnitW
  ) {
    this.Cols = [InCol0, InCol1, InCol2, InCol3];
  }

  transpose() {
    return new Matrix4x4(
      new Vector4(
        this.Cols[0].x,
        this.Cols[1].x,
        this.Cols[2].x,
        this.Cols[3].x
      ),
      new Vector4(
        this.Cols[0].y,
        this.Cols[1].y,
        this.Cols[2].y,
        this.Cols[3].y
      ),
      new Vector4(
        this.Cols[0].z,
        this.Cols[1].z,
        this.Cols[2].z,
        this.Cols[3].z
      ),
      new Vector4(
        this.Cols[0].w,
        this.Cols[1].w,
        this.Cols[2].w,
        this.Cols[3].w
      )
    );
  }

  add(m: Matrix4x4) {
    const col_1 = this.Cols[0].add(m.Cols[0]);
    const col_2 = this.Cols[1].add(m.Cols[1]);
    const col_3 = this.Cols[2].add(m.Cols[2]);
    const col_4 = this.Cols[3].add(m.Cols[3]);
    return new Matrix4x4(col_1, col_2, col_3, col_4);
  }
  subtract(m: Matrix4x4) {
    const col_1 = this.Cols[0].subtract(m.Cols[0]);
    const col_2 = this.Cols[1].subtract(m.Cols[1]);
    const col_3 = this.Cols[2].subtract(m.Cols[2]);
    const col_4 = this.Cols[3].subtract(m.Cols[3]);
    return new Matrix4x4(col_1, col_2, col_3, col_4);
  }

  scalarBy(x: number) {
    return new Matrix4x4(
      this.Cols[0].scalarBy(x),
      this.Cols[1].scalarBy(x),
      this.Cols[2].scalarBy(x),
      this.Cols[3].scalarBy(x)
    );
  }
  negative() {
    const col_1 = this.Cols[0].negative();
    const col_2 = this.Cols[1].negative();
    const col_3 = this.Cols[2].negative();
    const col_4 = this.Cols[3].negative();
    return new Matrix4x4(col_1, col_2, col_3, col_4);
  }

  multiplyMatrix(m: Matrix4x4) {
    const transposedMatrix = this.transpose();
    return new Matrix4x4(
      new Vector4(
        transposedMatrix.Cols[0].dot(m.Cols[0]),
        transposedMatrix.Cols[1].dot(m.Cols[0]),
        transposedMatrix.Cols[2].dot(m.Cols[0]),
        transposedMatrix.Cols[3].dot(m.Cols[0])
      ),
      new Vector4(
        transposedMatrix.Cols[0].dot(m.Cols[1]),
        transposedMatrix.Cols[1].dot(m.Cols[1]),
        transposedMatrix.Cols[2].dot(m.Cols[1]),
        transposedMatrix.Cols[3].dot(m.Cols[1])
      ),
      new Vector4(
        transposedMatrix.Cols[0].dot(m.Cols[2]),
        transposedMatrix.Cols[1].dot(m.Cols[2]),
        transposedMatrix.Cols[2].dot(m.Cols[2]),
        transposedMatrix.Cols[3].dot(m.Cols[2])
      ),
      new Vector4(
        transposedMatrix.Cols[0].dot(m.Cols[3]),
        transposedMatrix.Cols[1].dot(m.Cols[3]),
        transposedMatrix.Cols[2].dot(m.Cols[3]),
        transposedMatrix.Cols[3].dot(m.Cols[3])
      )
    );
  }

  multiplyVector(v: Vector4) {
    const transposedMatrix = this.transpose();
    return new Vector4(
      transposedMatrix.Cols[0].dot(v),
      transposedMatrix.Cols[1].dot(v),
      transposedMatrix.Cols[2].dot(v),
      transposedMatrix.Cols[3].dot(v)
    );
  }

  toMatrix3x3() {
    return new Matrix3x3(
      this.Cols[0].toVector3(),
      this.Cols[1].toVector3(),
      this.Cols[2].toVector3()
    );
  }
}
