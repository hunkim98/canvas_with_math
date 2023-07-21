import { Matrix } from "../types/matrix";
import { dotVectors, normalizeVector } from "./vectorFunctions";

export interface EigenResult {
  eigenvalue: number;
  eigenvector: number[];
}

function powerIteration(
  matrixData: Matrix,
  epsilon: number = 1e-6,
  maxIterations: number = 1000,
): EigenResult {
  const n = matrixData.length;

  // Initialize a random initial eigenvector
  let eigenvector: number[] = Array(n).fill(1);

  // Power iteration loop
  for (let i = 0; i < maxIterations; i++) {
    const prevEigenvector = eigenvector.slice();
    eigenvector = matrixData.map(row => dotVectors(row, prevEigenvector));

    // Normalize the eigenvector at each step
    eigenvector = normalizeVector(eigenvector);

    // Calculate the change in eigenvector
    const change = eigenvector.map((val, i) => val - prevEigenvector[i]);
    const magnitudeOfChange = Math.sqrt(dotVectors(change, change));

    // Check for convergence
    if (magnitudeOfChange < epsilon) {
      // Calculate the corresponding eigenvalue
      const eigenvalue = dotVectors(
        eigenvector,
        matrixData.map(row => dotVectors(row, eigenvector)),
      );
      return { eigenvalue, eigenvector };
    }
  }

  throw new Error(
    "Power iteration did not converge within the maximum number of iterations.",
  );
}

export function eig(m: Matrix): EigenResult {
  return powerIteration(m);
}
