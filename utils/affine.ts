import { Matrix } from "../types/matrix";

export const vectorToAffineVector = (vector: Array<number>) => {
  const affineVector: Array<number> = [];
  for (let i = 0; i < vector.length; i++) {
    affineVector.push(vector[i]);
  }
  affineVector.push(1);
  return affineVector;
};

/**
 *
 * @param vector the vector here should be the amount you
 * would like to add to the points
 */
export const createAffineTranslateMatrix = (vector: Array<number>) => {
  const lastColumnVector = vectorToAffineVector(vector);
  //the length of the vector is the space dimension
  const affineMatrix: Matrix = [];
  for (let i = 0; i < vector.length; i++) {
    const unitVector = [];
    for (let j = 0; j < vector.length; j++) {
      if (i === j) {
        unitVector.push(1);
      } else {
        unitVector.push(0);
      }
    }
    // other columns except for the last column
    // should have their last axis set to 0
    unitVector.push(0);
    affineMatrix.push(unitVector);
  }
  affineMatrix.push(lastColumnVector);
  return affineMatrix;
};

const createAffineRotateAndScaleMatrix = (matrix: Matrix) => {
  const affineMatrix: Matrix = [];
  for (const vector of matrix) {
    const newVector = [...vector, 0];
    affineMatrix.push(newVector);
  }
  const dimension = matrix[0].length;
  const unitVector = [];
  for (let i = 0; i < dimension; i++) {
    unitVector.push(0);
  }
  unitVector.push(1);
  affineMatrix.push(unitVector);
  return affineMatrix;
};

export const createAffineRotateMatrix = createAffineRotateAndScaleMatrix;

export const createAffineScaleMatrix = createAffineRotateAndScaleMatrix;

export const affineVectorToVector = (vector: Array<number>) => {
  return vector.slice(0, -1);
};
