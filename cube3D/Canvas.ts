import { Vector3 } from "../utils/vector/Vector3";
import { drawLine } from "../utils/Renderer/Canvas";
import { Vertex3D } from "../utils/Renderer/3D/vertex";
import { Rotator } from "../utils/Renderer/Math/Rotator";
import { CameraObject } from "../utils/Renderer/3D/CameraObject";
import { TransformComponent } from "../utils/Renderer/3D/TransformComponent";

export default class Canvas {
  private canvas: HTMLCanvasElement;
  private context: CanvasRenderingContext2D;
  private width: number;
  private height: number;
  private fps = 60;
  private frameCount = 0;
  private vertexBuffer: Array<Vector3> = [];
  private indexBuffer: Array<number> = [];
  private camera: CameraObject;
  private cubeTransform: TransformComponent;
  private then: number = 0;

  //we use an interpolator - it automatically makes a gradient between colors

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.context = canvas.getContext("2d")!;
    this.canvas.style.border = "1px solid black";
    this.width = 300;
    this.height = 300;
    this.canvas.width = this.width;
    this.canvas.height = this.height;
    this.canvas.style.width = `${this.width}px`;
    this.canvas.style.height = `${this.height}px`;
    this.camera = new CameraObject();
    this.cubeTransform = new TransformComponent();
    console.log("canvas has been set!");
    this.cubeTransform.rotation.Yaw = 1;
    this.cubeTransform.rotation.Pitch = 1;
    //requesting animation
    this.initCube(50);
    requestAnimationFrame(this.render);
  }

  // render = (now: DOMHighResTimeStamp) => {
  //   now *= 0.001; // convert to seconds
  //   const deltaTime = now - this.then;
  //   this.then = now;
  //   this.drawScene(deltaTime);
  //   requestAnimationFrame(this.render);
  // };

  render = () => {
    this.clear();
    this.drawScene();
    setTimeout(() => {
      requestAnimationFrame(this.render.bind(this));
    }, 1000 / this.fps);
  };

  initCube(sideLength: number) {
    //TO create a mesh we always need two buffers - vertexBuffer & indexBuffer

    const length = 1.0 * sideLength;
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
    this.vertexBuffer = vertexBuffer;
    this.indexBuffer = indexBuffer;
  }

  drawCube() {
    const updatedVertexBuffer = [];
    // console.log(this.cubeTransform.rotation.Yaw);
    //update the modelin matrix
    this.cubeTransform.update();
    const finalMatrix = this.camera
      .getViewMatrix()
      .multiplyMatrix(this.cubeTransform.getModelingMatrix());
    for (let i = 0; i < this.vertexBuffer.length; i++) {
      const newVertex = finalMatrix.multiplyVector(
        this.vertexBuffer[i].toAffine(true),
      );
      updatedVertexBuffer.push(
        new Vector3(newVertex.x, newVertex.y, newVertex.z),
      );
    }
    this.vertexBuffer = updatedVertexBuffer;
    this.drawMeshLines();
  }

  drawMeshLines() {
    for (let ti = 0; ti < this.indexBuffer.length / 3; ++ti) {
      const bi = ti * 3;
      drawLine(
        this.canvas,
        this.vertexBuffer[this.indexBuffer[bi]].toAffine(true),
        this.vertexBuffer[this.indexBuffer[bi + 1]].toAffine(true),
      );
      drawLine(
        this.canvas,
        this.vertexBuffer[this.indexBuffer[bi]].toAffine(true),
        this.vertexBuffer[this.indexBuffer[bi + 2]].toAffine(true),
      );
      drawLine(
        this.canvas,
        this.vertexBuffer[this.indexBuffer[bi + 1]].toAffine(true),
        this.vertexBuffer[this.indexBuffer[bi + 2]].toAffine(true),
      );
    }
  }

  initBuffers() {
    // we disable prettier for the bottom variable for ease
    /* prettier-ignore */
    const faceColors = [
      [1.0,  1.0,  1.0,  1.0],    // Front face: white
      [1.0,  0.0,  0.0,  1.0],    // Back face: red
      [0.0,  1.0,  0.0,  1.0],    // Top face: green
      [0.0,  0.0,  1.0,  1.0],    // Bottom face: blue
      [1.0,  1.0,  0.0,  1.0],    // Right face: yellow
      [1.0,  0.0,  1.0,  1.0],    // Left face: purple
    ];
    // Create a buffer for the square's positions.

    let colors: number[] = [];

    for (let j = 0; j < faceColors.length; ++j) {
      const c = faceColors[j];
      // Repeat each color four times for the four vertices of the face
      colors = colors.concat(c, c, c, c);
    }
  }
  drawScene() {
    this.drawCube();
  }
  clear() {
    this.context.clearRect(0, 0, this.width, this.height);
  }
}
