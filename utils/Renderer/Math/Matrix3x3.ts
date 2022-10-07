import { Vector3 } from "../../vector/Vector3";
import { Matrix2x2 } from "./Matrix2x2";

export class Matrix3x3 {
  Cols: Array<Vector3>;

  constructor(
    InCol0: Vector3 = Vector3.UnitX,
    InCol1: Vector3 = Vector3.UnitY,
    InCol2: Vector3 = Vector3.UnitZ
  ) {
    this.Cols = [InCol0, InCol1, InCol2];
  }

  transpose() {
    return new Matrix3x3(
      new Vector3(this.Cols[0].x, this.Cols[1].x, this.Cols[2].x),
      new Vector3(this.Cols[0].y, this.Cols[1].y, this.Cols[2].y),
      new Vector3(this.Cols[0].z, this.Cols[1].z, this.Cols[2].z)
    );
  }

  add(m: Matrix3x3) {
    const col_1 = this.Cols[0].add(m.Cols[0]);
    const col_2 = this.Cols[1].add(m.Cols[1]);
    const col_3 = this.Cols[2].add(m.Cols[2]);
    return new Matrix3x3(col_1, col_2, col_3);
  }
  subtract(m: Matrix3x3) {
    const col_1 = this.Cols[0].subtract(m.Cols[0]);
    const col_2 = this.Cols[1].subtract(m.Cols[1]);
    const col_3 = this.Cols[2].subtract(m.Cols[2]);
    return new Matrix3x3(col_1, col_2, col_3);
  }

  scalarBy(x: number) {
    return new Matrix3x3(
      this.Cols[0].scalarBy(x),
      this.Cols[1].scalarBy(x),
      this.Cols[2].scalarBy(x)
    );
  }

  negative() {
    const col_1 = this.Cols[0].negative();
    const col_2 = this.Cols[1].negative();
    const col_3 = this.Cols[2].negative();
    return new Matrix3x3(col_1, col_2, col_3);
  }

  determinant() {}

  multiplyMatrix(m: Matrix3x3) {
    const transposedMatrix = this.transpose();
    return new Matrix3x3(
      new Vector3(
        transposedMatrix.Cols[0].dot(m.Cols[0]),
        transposedMatrix.Cols[1].dot(m.Cols[0]),
        transposedMatrix.Cols[2].dot(m.Cols[0])
      ),
      new Vector3(
        transposedMatrix.Cols[0].dot(m.Cols[1]),
        transposedMatrix.Cols[1].dot(m.Cols[1]),
        transposedMatrix.Cols[2].dot(m.Cols[1])
      ),
      new Vector3(
        transposedMatrix.Cols[0].dot(m.Cols[2]),
        transposedMatrix.Cols[1].dot(m.Cols[2]),
        transposedMatrix.Cols[2].dot(m.Cols[2])
      )
    );
  }

  multiplyVector(v: Vector3) {
    const transposedMatrix = this.transpose();
    return new Vector3(
      transposedMatrix.Cols[0].dot(v),
      transposedMatrix.Cols[1].dot(v),
      transposedMatrix.Cols[2].dot(v)
    );
  }

  toMatrix2x2() {
    return new Matrix2x2(this.Cols[0].toVector2(), this.Cols[1].toVector2());
  }
}
