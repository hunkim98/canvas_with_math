import { Vector3 } from "../utils/vector/Vector3";
import { drawLine } from "../utils/Renderer/Canvas";
import { Vertex3D } from "../utils/Renderer/3D/vertex";
import { Rotator } from "../utils/Renderer/Math/Rotator";
import { CameraObject } from "../utils/Renderer/3D/CameraObject";
import { TransformComponent } from "../utils/Renderer/3D/TransformComponent";
import { GameEngine } from "../utils/Renderer/3D/GameEngine";
import { GameObject } from "../utils/Renderer/3D/GameObject";

export default class Canvas {
  private canvas: HTMLCanvasElement;
  private context: CanvasRenderingContext2D;
  private width: number;
  private height: number;
  private fps = 60;
  private frameCount = 0;
  // private vertexBuffer: Array<Vector3> = [];
  // private indexBuffer: Array<number> = [];
  private camera: CameraObject;
  private then: number = 0;
  private cubeObject: GameObject;

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
    console.log("canvas has been set!");
    // this.cubeTransform.rotation.Yaw = 1;
    // this.cubeTransform.rotation.Pitch = 1;
    this.camera.transform.setPosition(new Vector3(0, 0, 500));
    this.camera.transform.setRotation(new Rotator(180, 0, 0));
    //requesting animation
    this.cubeObject = new GameObject("cube", GameEngine.CubeMesh);
    this.cubeObject.transform.setPosition(new Vector3(0, 0, 0));
    this.cubeObject.transform.setScale(new Vector3(50, 50, 50));
    // updatedBuffer = this.cubeObject.getMesh().getVertices();
    // indexBuffer = this.cubeObject.getMesh().getIndices();

    requestAnimationFrame(this.update);
  }

  // render = (now: DOMHighResTimeStamp) => {
  //   now *= 0.001; // convert to seconds
  //   const deltaTime = now - this.then;
  //   this.then = now;
  //   this.drawScene(deltaTime);
  //   requestAnimationFrame(this.render);
  // };

  update = () => {
    this.cubeObject.transform.addPitchRotation(1);
    this.cubeObject.transform.addYawRotation(1);
    this.clear();
    this.drawScene();
    setTimeout(() => {
      requestAnimationFrame(this.update.bind(this));
    }, 1000 / this.fps);
  };

  drawCube() {
    const updatedVertexBuffer: Vector3[] = [];
    // console.log(this.cubeTransform.rotation.Yaw);
    //update the modelin matrix
    const finalMatrix = this.camera
      .getViewMatrix()
      .multiplyMatrix(this.cubeObject.transform.getModelingMatrix());
    const vertexBuffer = this.cubeObject.getMesh().getVertices();
    for (let i = 0; i < vertexBuffer.length; i++) {
      const newVertex = finalMatrix.multiplyVector(
        vertexBuffer[i].toAffine(true),
      );
      this.camera.transform.update();
      this.cubeObject.transform.update();
      updatedVertexBuffer.push(
        new Vector3(newVertex.x, newVertex.y, newVertex.z),
      );
    }
    this.drawMeshLines(updatedVertexBuffer);
  }

  drawMeshLines(updatedBuffer: Vector3[]) {
    const indexBuffer = this.cubeObject.getMesh().getIndices();
    for (let ti = 0; ti < indexBuffer.length / 3; ++ti) {
      const bi = ti * 3;
      console.log("hi");
      drawLine(
        this.canvas,
        updatedBuffer[indexBuffer[bi]].toAffine(true),
        updatedBuffer[indexBuffer[bi + 1]].toAffine(true),
      );
      drawLine(
        this.canvas,
        updatedBuffer[indexBuffer[bi]].toAffine(true),
        updatedBuffer[indexBuffer[bi + 2]].toAffine(true),
      );
      drawLine(
        this.canvas,
        updatedBuffer[indexBuffer[bi + 1]].toAffine(true),
        updatedBuffer[indexBuffer[bi + 2]].toAffine(true),
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
