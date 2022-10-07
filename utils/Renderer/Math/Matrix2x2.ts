import { Vector2 } from "../../vector/Vector2";

export class Matrix2x2 {
  Cols: Array<Vector2>;

  constructor(
    InCol0: Vector2 = Vector2.UnitX,
    InCol1: Vector2 = Vector2.UnitY
  ) {
    this.Cols = [InCol0, InCol1];
  }
  transpose() {
    return new Matrix2x2(
      new Vector2(this.Cols[0].x, this.Cols[1].x),
      new Vector2(this.Cols[0].y, this.Cols[1].y)
    );
  }

  add(m: Matrix2x2) {
    const col_1 = this.Cols[0].add(m.Cols[0]);
    const col_2 = this.Cols[1].add(m.Cols[1]);
    return new Matrix2x2(col_1, col_2);
  }
  subtract(m: Matrix2x2) {
    const col_1 = this.Cols[0].subtract(m.Cols[0]);
    const col_2 = this.Cols[1].subtract(m.Cols[1]);
    return new Matrix2x2(col_1, col_2);
  }
  scalarBy(x: number) {
    return new Matrix2x2(this.Cols[0].scalarBy(x), this.Cols[1].scalarBy(x));
  }
  negative() {
    const col_1 = this.Cols[0].negative();
    const col_2 = this.Cols[1].negative();
    return new Matrix2x2(col_1, col_2);
  }
  determinant() {
    return this.Cols[0].x * this.Cols[1].y - this.Cols[0].y - this.Cols[1].x;
  }

  multiplyMatrix(m: Matrix2x2) {
    const transposedMatrix = this.transpose();
    return new Matrix2x2(
      new Vector2(
        transposedMatrix.Cols[0].dot(m.Cols[0]),
        transposedMatrix.Cols[1].dot(m.Cols[0])
      ),
      new Vector2(
        transposedMatrix.Cols[0].dot(m.Cols[1]),
        transposedMatrix.Cols[1].dot(m.Cols[1])
      )
    );
  }

  multiplyVector(v: Vector2) {
    const transposedMatrix = this.transpose();
    return new Vector2(
      transposedMatrix.Cols[0].dot(v),
      transposedMatrix.Cols[1].dot(v)
    );
  }
}
