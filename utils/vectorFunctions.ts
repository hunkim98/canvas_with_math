export function addVectors(v1: Array<number>, v2: Array<number>) {
  const result: Array<number> = [];
  for (let i = 0; i < v1.length; i++) {
    const element = v1[i] + v2[i];
    result.push(element);
  }
  return result;
}

export function dotVectors(v1: Array<number>, v2: Array<number>) {
  if (v1.length !== v2.length) {
    throw new Error("the vectors' length differ");
  }
  let result = 0;
  v1.map((element, index) => {
    result += element * v2[index];
  });
  return result;
}

export function subtractVectors(v1: Array<number>, v2: Array<number>) {
  const result: Array<number> = [];
  for (let i = 0; i < v1.length; i++) {
    const element = v1[i] - v2[i];
    result.push(element);
  }
  return result;
}

export function scalarVector(vector: Array<number>, scalar: number) {
  const result: Array<number> = [];
  for (let i = 0; i < vector.length; i++) {
    const element = vector[i] * scalar;
    result.push(element);
  }
  return result;
}

export function returnVectorSize(vector: Array<number>) {
  let sum = 0;
  for (const element of vector) {
    sum += element * element;
  }
  return sum;
}
