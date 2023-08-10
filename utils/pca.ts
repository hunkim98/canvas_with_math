import Matrix, { EigenvalueDecomposition } from "ml-matrix";
import { dotVectors } from "./vectorFunctions";

// referecne: http://www.cs.otago.ac.nz/cosc453/student_tutorials/principal_components.pdf

/**
 *
 * @param data data matrix
 * @param k k principal components
 * @returns
 */
export function pca(data: Matrix, k: number) {
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
  // the eigenvectors with the lowest eigenvalues bear the least information about the distribution of the data
  // eigenvectors that correspond to the highest eigenvalues (called the principal components)
  // bear the most information about the distribution of the data
  const eigPairs: { value: number; vector: number[] }[] = realEigenvalues.map(
    (val, i) => ({ value: val, vector: eigenvectorMatrix.getColumn(i) }),
  );
  eigPairs.sort((a, b) => b.value - a.value);

  // Step 6: Choose Principal Components
  const principalComponents: Matrix = new Matrix(eigPairs
    .slice(0, k)
    .map(pair => pair.vector));

  // Step 7: Project Data
  // with k features, we can represent all other features as a linear combination of the k features
  const projectedData: Matrix = new Matrix(
    data.to2DArray().map(row =>
      principalComponents.to2DArray().map(pc => {
        return dotVectors(row, pc);
      }),
    ),
  );

  const reconstructedOriginal = new Matrix(
    projectedData.to2DArray().map(row =>
      principalComponents.transpose().to2DArray().map((pc, index) => {
        return dotVectors(row, pc) + mean[index];
      }),
    ),
  );

  console.log(reconstructedOriginal.rows, reconstructedOriginal.columns, 'original?');



  return {projectedData, dataOriginal: reconstructedOriginal};
}
