import { Vector3 } from "../../../vector/Vector3";
import { Mesh3D } from "../mesh";

const length = 1.0;
//모든 faceVector는
const frontFaceVectors: Array<Vector3> = [
  //0과 2는 겹쳐지는 거싱라고 보면 된다
  new Vector3(-length, length, length), //0 - frontA & fontB
  new Vector3(-length, -length, length), //1 - frontA
  new Vector3(length, -length, length), //2 - frontA & frontB
  new Vector3(length, length, length), //3 - frontB
];
const backFaceVectors: Array<Vector3> = [
  //front를 뒤집어보게끔 함
  new Vector3(-length, -length, -length), //4
  new Vector3(-length, length, -length), //5
  new Vector3(length, length, -length), //6
  new Vector3(length, -length, -length), //7
];
const topFaceVectors: Array<Vector3> = [
  //y axis is 1
  new Vector3(-length, length, -length),
  new Vector3(-length, length, length),
  new Vector3(length, length, length),
  new Vector3(length, length, -length),
];
const bottomFaceVectors: Array<Vector3> = [
  new Vector3(-length, -length, length),
  new Vector3(-length, -length, -length),
  new Vector3(length, -length, -length),
  new Vector3(length, -length, length),
];
const rightFaceVectors: Array<Vector3> = [
  //3차원을 y축 위에서 내려 보았을때 때 오른쪽(z방향)이 양수이다
  //즉, z방향이 더 큰 물체가 카메라와 더 멀어지는 것이다
  new Vector3(length, -length, -length),
  new Vector3(length, -length, length),
  new Vector3(length, length, length),
  new Vector3(length, length, -length),
];
const leftFaceVectors: Array<Vector3> = [
  new Vector3(-length, -length, length),
  new Vector3(-length, -length, -length),
  new Vector3(-length, length, -length),
  new Vector3(-length, length, length),
];
//vertexBuffer를 이렇게 쉽게 나타낼 수 있었던 이유는 이게 cube 때문이다
//원래는 엄청 난잡할 것이다
const vertexBuffer: Array<Vector3> = [
  ...frontFaceVectors,
  ...backFaceVectors,
  ...topFaceVectors,
  ...bottomFaceVectors,
  ...rightFaceVectors,
  ...leftFaceVectors,
];

//we need to know how many indexes there will be beforehand
//indices tell us how the lines of the triangles will be drawn
const frontIndices = [0, 1, 2, 0, 2, 3];
const backIndices = frontIndices.map(element => element + 4);
const topIndices = backIndices.map(element => element + 4);
const bottomIndices = topIndices.map(element => element + 4);
const rightIndices = bottomIndices.map(element => element + 4);
const leftIndices = rightIndices.map(element => element + 4);

//인덱스 정보는 삼각형의 수만큼 필요하기 때문에 버퍼의 크기(vector 개수)는 항상 3의 배수이다
//우리가 Mesh class를 만들때는 vertices, indices 정보를 무조건 수동으로 기입해야 한다
const indexBuffer: Array<number> = [
  ...frontIndices,
  ...backIndices,
  ...topIndices,
  ...bottomIndices,
  ...rightIndices,
  ...leftIndices,
];

export const CubeMesh = new Mesh3D(vertexBuffer, indexBuffer);
