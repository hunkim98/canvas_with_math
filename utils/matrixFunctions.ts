import { Matrix } from "../types/matrix";
import { GenericVector } from "../types/vector";

export function multiplyMatrices(m1: Matrix, m2: Matrix): Matrix {
  const result: Matrix = [];
  //our result will have m2.length column
  for (let i = 0; i < m2.length; i++) {
    const resultColumn = [];
    //we will have m1.length elements in the vector column
    for (let j = 0; j < m1[0].length; j++) {
      let sum = 0;
      //m2[0].length is how many elements are multiplied
      for (let k = 0; k < m2[0].length; k++) {
        sum += m1[k][j] * m2[i][k];
      }
      resultColumn.push(sum);
    }
    result.push(resultColumn);
  }
  return result;
}

export function multiplyMatrixWithVector(
  matrix: Matrix,
  vector: GenericVector
): GenericVector {
  const matrixResult = multiplyMatrices(matrix, [vector]);
  return matrixResult[0];
}

export function transposeMatrix(matrix: Matrix) {
  return matrix[0].map((_, colIndex) => matrix.map((row) => row[colIndex]));
}

export function addMatrices(m1: Matrix, m2: Matrix) {
  const result: Matrix = [];
  for (let i = 0; i < m1.length; i++) {
    const resultRow = [];
    for (let j = 0; j < m1[0].length; j++) {
      resultRow.push(m1[i][j] + m2[i][j]);
    }
    result.push(resultRow);
  }
  return result;
}

export function subtractMatrices(m1: Matrix, m2: Matrix) {
  const result: Matrix = [];
  for (let i = 0; i < m1.length; i++) {
    const resultRow = [];
    for (let j = 0; j < m1[0].length; j++) {
      resultRow.push(m1[i][j] - m2[i][j]);
    }
    result.push(resultRow);
  }
  return result;
}

export function scalarMatrix(m1: Matrix, scalar: number) {
  const result: Matrix = [];
  for (let i = 0; i < m1.length; i++) {
    const resultRow = [];
    for (let j = 0; j < m1[0].length; j++) {
      resultRow.push(scalar * m1[i][j]);
    }
    result.push(resultRow);
  }
  return result;
}
