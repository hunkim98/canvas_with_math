import { Matrix } from "../types/matrix";
import { Vector2d } from "../types/vector";
import { multiplyMatrices, multiplyMatrixWithVector } from "./matrixFunctions";

export function rotateVector2d(vector: Vector2d, radian: number) {
  if (vector.length !== 2) {
    throw new Error("the input vector is not a vector2d");
  }
  const cos = Math.cos(radian);
  const sin = Math.sin(radian);

  const rotateMatrix: Matrix = [
    [cos, sin],
    [-sin, cos],
  ];
  console.log(multiplyMatrixWithVector(rotateMatrix, vector));
  return multiplyMatrixWithVector(rotateMatrix, vector) as Vector2d;
}
