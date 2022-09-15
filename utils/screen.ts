export const toScreenPointVector = (vector: Array<number>) => {
  const screenPointVector: number[] = [];
  for (let i = 0; i < vector.length; i++) {
    screenPointVector.push(Math.floor(vector[i]));
  }
  return screenPointVector;
};
