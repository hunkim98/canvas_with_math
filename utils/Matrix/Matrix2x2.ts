import { Vector2 } from "../vector/Vector2";

export class Matrix2x2 {
  vectors: Vector2[];
  constructor(v1: Vector2, v2: Vector2) {
    this.vectors = [v1, v2];
  }
  add(m: Matrix2x2) {
    const col_1 = this.vectors[0].add(m.vectors[0]);
    const col_2 = this.vectors[1].add(m.vectors[1]);
    return new Matrix2x2(col_1, col_2);
  }
  subtract(m: Matrix2x2) {
    const col_1 = this.vectors[0].subtract(m.vectors[0]);
    const col_2 = this.vectors[1].subtract(m.vectors[1]);
    return new Matrix2x2(col_1, col_2);
  }
  scalarBy(n: number) {
    const col_1 = this.vectors[0].scalarBy(n);
    const col_2 = this.vectors[1].scalarBy(n);
    return new Matrix2x2(col_1, col_2);
  }
  negative() {
    const col_1 = this.vectors[0].negative();
    const col_2 = this.vectors[1].negative();
    return new Matrix2x2(col_1, col_2);
  }
  determinant() {
    return (
      this.vectors[0].x * this.vectors[1].y -
      this.vectors[0].y -
      this.vectors[1].x
    );
  }
  multiply(m: Matrix2x2) {
    const m_00 =
      this.vectors[0].x * m.vectors[0].x + this.vectors[1].x * m.vectors[0].y;
    const m_01 =
      this.vectors[0].x * m.vectors[1].x + this.vectors[1].x * m.vectors[1].y;
    const m_10 =
      this.vectors[0].y * m.vectors[0].x + this.vectors[1].y * m.vectors[0].y;
    const m_11 =
      this.vectors[0].y * m.vectors[1].x + this.vectors[1].y * m.vectors[1].y;
    const col_1 = new Vector2(m_00, m_10);
    const col_2 = new Vector2(m_01, m_11);
    return new Matrix2x2(col_1, col_2);
  }
}
