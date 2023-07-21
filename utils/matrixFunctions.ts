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
  vector: GenericVector,
): GenericVector {
  const matrixResult = multiplyMatrices(matrix, [vector]);
  return matrixResult[0];
}

export function transposeMatrix(matrix: Matrix) {
  return matrix[0].map((_, colIndex) => matrix.map(row => row[colIndex]));
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

/**
 * @description get the determinant of a matrix
 * the determinant is nonzero if and only if the matrix is invertible
 * and the linear map represented by the matrix is an isomorphism.
 * @param m Matrix
 * @returns determinant of the matrix
 */
export function getMatrixDet(m: Matrix) {
  if (m.length === 2) {
    return m[0][0] * m[1][1] - m[0][1] * m[1][0];
  }
  let sum = 0;
  for (let i = 0; i < m.length; i++) {
    sum += m[0][i] * getCofactor(m, 0, i);
  }
  return sum;
}

export function getCofactor(m: Matrix, row: number, col: number) {
  const minor = getMinor(m, row, col);
  return Math.pow(-1, row + col) * getMatrixDet(minor);
}

export function getMinor(m: Matrix, row: number, col: number) {
  const minor: Matrix = [];
  for (let i = 0; i < m.length; i++) {
    if (i !== row) {
      const minorRow = [];
      for (let j = 0; j < m.length; j++) {
        if (j !== col) {
          minorRow.push(m[i][j]);
        }
      }
      minor.push(minorRow);
    }
  }
  return minor;
}
