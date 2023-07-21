import Matrix, { EigenvalueDecomposition } from "ml-matrix";
import { dotVectors } from "./vectorFunctions";

export function pca(data: Matrix, k: number): Array<Array<number>> {
  const n = data.rows;
  const m = data.columns;

  // Step 1: Compute the Mean

  const mean: number[] = data
    .to2DArray()
    .reduce((acc, row) => acc.map((val, i) => val + row[i]), Array(m).fill(0));
  mean.forEach((val, i) => (mean[i] = val / n));

  // Step 2: Center the Data
  data.subRowVector(mean);

  // Step 3: Compute the Covariance Matrix
  const covarianceMatrix: number[][] = Array.from({ length: m }, () =>
    Array(m).fill(0),
  );
  for (let i = 0; i < m; i++) {
    for (let j = i; j < m; j++) {
      let covariance = 0;

      for (let k = 0; k < n; k++) {
        covariance += data.get(k, i) * data.get(k, j);
      }

      covariance = covariance / n;
      covarianceMatrix[i][j] = covariance;
      covarianceMatrix[j][i] = covariance; // Since covariance is symmetric, fill both upper and lower triangle
    }
  }

  // Step 4: Calculate Eigenvectors and Eigenvalues
  const { realEigenvalues, eigenvectorMatrix } = new EigenvalueDecomposition(
    covarianceMatrix,
  );

  // Step 5: Sort Eigenvectors by Eigenvalues
  const eigPairs: { value: number; vector: number[] }[] = realEigenvalues.map(
    (val, i) => ({ value: val, vector: eigenvectorMatrix.getColumn(i) }),
  );
  eigPairs.sort((a, b) => b.value - a.value);

  // Step 6: Choose Principal Components
  const principalComponents: number[][] = eigPairs
    .slice(0, k)
    .map(pair => pair.vector);

  // Step 7: Project Data
  const projectedData: number[][] = data
    .to2DArray()
    .map(row => principalComponents.map(pc => dotVectors(row, pc)));

  return projectedData;
}
