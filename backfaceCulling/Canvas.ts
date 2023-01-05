import { Vector3 } from "../utils/vector/Vector3";
import { drawLine } from "../utils/Renderer/Canvas";
import { Vertex3D } from "../utils/Renderer/3D/vertex";
import { Rotator } from "../utils/Renderer/Math/Rotator";
import { CameraObject } from "../utils/Renderer/3D/CameraObject";
import { TransformComponent } from "../utils/Renderer/3D/TransformComponent";
import { GameEngine } from "../utils/Renderer/3D/GameEngine";
import { GameObject } from "../utils/Renderer/3D/GameObject";
import { Matrix4x4 } from "../utils/Renderer/Math/Matrix4x4";
import { LinearColor } from "../utils/Renderer/Math/LinearColor";
import { Mesh3D } from "../utils/Renderer/3D/mesh";

export default class Canvas {
  private canvas: HTMLCanvasElement;
  private context: CanvasRenderingContext2D;
  private width: number;
  private height: number;
  private fps = 60;
  private frameCount = 0;
  private camera: CameraObject;
  private gameEngine: GameEngine;
  private gameObject: GameObject;
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
    this.camera.transform.setPosition(new Vector3(0, 0, 500));
    this.camera.transform.setRotation(new Rotator(180, 0, 0));
    this.gameEngine = new GameEngine(this.camera);
    this.gameObject = this.gameEngine.createGameObject(
      "cube",
      GameEngine.CubeMesh,
    );
    this.gameObject.transform.setScale(new Vector3(50, 50, 50));
    console.log("canvas has been set!");
    // this.cubeTransform.rotation.Yaw = 1;
    // this.cubeTransform.rotation.Pitch = 1;
    //requesting animation
    requestAnimationFrame(this.render);
  }

  render = () => {
    this.gameObject.transform.addYawRotation(1);
    this.gameObject.transform.addPitchRotation(1);
    // this.cubeTransform.addYawRotation(1);
    // this.camera.transform.addYawRotation(0.1);
    // this.camera.transform.addPitchRotation(1);
    // this.camera.transform.addRollRotation(0.1);
    // this.cubeTransform.addPitchRotation(1);
    this.clear();
    this.drawScene();
    setTimeout(() => {
      requestAnimationFrame(this.render.bind(this));
    }, 1000 / this.fps);
  };

  render3D() {
    const gameObjects = this.gameEngine.getGameObjects();
    for (const gameObject of gameObjects) {
      const updatedVertexBuffer = [];
      // console.log(this.cubeTransform.rotation.Yaw);
      //update the modelin matrix
      this.camera.transform.update();
      gameObject.transform.update();
      const finalMatrix = this.camera
        .getViewMatrix()
        .multiplyMatrix(this.gameObject.transform.getModelingMatrix());
      this.drawMesh3D(gameObject.getMesh(), finalMatrix, gameObject.transform);
    }
  }

  drawMesh3D(
    mesh: Mesh3D,
    modelMatrix: Matrix4x4,
    objectTransform: TransformComponent,
    linearColor?: LinearColor,
  ) {
    const vertexBuffers = mesh.getVertices();
    const indexBuffers = mesh.getIndices();
    const updatedVertexBuffers = vertexBuffers.map(buffer => {
      return modelMatrix.multiplyVector(buffer.toAffine(true)).toVector3();
    });
    const triangleCount = indexBuffers.length / 3;
    for (let ti = 0; ti < triangleCount; ++ti) {
      const bi = ti * 3;
      //backface culling added here (cross product)
      const v1 = updatedVertexBuffers[indexBuffers[bi + 1]].subtract(
        updatedVertexBuffers[indexBuffers[bi]],
      );
      const v2 = updatedVertexBuffers[indexBuffers[bi + 2]].subtract(
        updatedVertexBuffers[indexBuffers[bi]],
      );
      const normal = v1.crossProduct(v2);
      const cameraRay = objectTransform.position.subtract(
        this.camera.transform.position,
      );
      if (normal.dot(cameraRay) >= 0) {
        continue;
        // return;
      }

      drawLine(
        this.canvas,
        updatedVertexBuffers[indexBuffers[bi]].toAffine(true),
        updatedVertexBuffers[indexBuffers[bi + 1]].toAffine(true),
      );
      drawLine(
        this.canvas,
        updatedVertexBuffers[indexBuffers[bi]].toAffine(true),
        updatedVertexBuffers[indexBuffers[bi + 2]].toAffine(true),
      );
      drawLine(
        this.canvas,
        updatedVertexBuffers[indexBuffers[bi + 1]].toAffine(true),
        updatedVertexBuffers[indexBuffers[bi + 2]].toAffine(true),
      );
    }
  }

  drawScene() {
    this.render3D();
  }

  clear() {
    this.context.clearRect(0, 0, this.width, this.height);
  }
}
