import { Matrix } from "../types/matrix";
import { Vector2d } from "../types/vector";
import { multiplyMatrices, multiplyMatrixWithVector } from "./matrixFunctions";

export function rotateVector2d(vector: Vector2d, radian: number) {
  if (vector.length !== 2) {
    throw new Error("the input vector is not a vector2d");
  }
  const rotateMatrix = createRotateMatrix(radian);
  return multiplyMatrixWithVector(rotateMatrix, vector) as Vector2d;
}

export function xAxisReflectVector2d(vector: Vector2d) {
  const reflectMatrix: Matrix = [
    [1, 0],
    [0, -1],
  ];
  return multiplyMatrixWithVector(reflectMatrix, vector) as Vector2d;
}

export function createRotateMatrix(radian: number) {
  const cos = Math.cos(radian);
  const sin = Math.sin(radian);
  const rotateMatrix: Matrix = [
    [cos, sin],
    [-sin, cos],
  ];
  return rotateMatrix;
}
