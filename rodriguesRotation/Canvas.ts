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
  private camera: CameraObject;
  private gameEngine: GameEngine;
  private gameObject: GameObject;
  private n: Vector3 = new Vector3(0, 0, 0); // the rotate axis vector
  private right: Vector3 = new Vector3(0, 0, 0); // the first vector that is orthogonal to n
  private forward: Vector3 = new Vector3(0, 0, 0); // the second vector that is orthogonal to n
  private thetaChangeDegree: number = 0;
  private rotateAxisDirection: "Yaw" | "Pitch" | "Roll" | null = null;
  private rotateObjectDirection: "Clockwise" | "CounterClockwise" | null = null;
  private axisRotator: Rotator = new Rotator(0, 0, 0);

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
    const localsAxes = this.axisRotator.getLocalAxes();
    this.right = localsAxes.OutRight;
    this.n = localsAxes.OutUp;
    this.forward = localsAxes.OutForward;
    console.log("canvas has been set!");
    // this.cubeTransform.rotation.Yaw = 1;
    // this.cubeTransform.rotation.Pitch = 1;
    //requesting animation
    requestAnimationFrame(this.render);
  }

  rotateAxisOn(rotateAxis: "Yaw" | "Pitch" | "Roll") {
    this.rotateAxisDirection = rotateAxis;
  }

  rotateLeftBasedOnAxis() {
    this.rotateObjectDirection = "CounterClockwise";
  }

  rotateRightBasedOnAxis() {
    this.rotateObjectDirection = "Clockwise";
  }

  stopRotate() {
    this.rotateAxisDirection = null;
    this.rotateObjectDirection = null;
  }

  render = () => {
    // this.gameObject.transform.addYawRotation(1);
    // this.gameObject.transform.addPitchRotation(1);
    // this.cubeTransform.addYawRotation(1);
    // this.camera.transform.addYawRotation(0.1);
    // this.camera.transform.addPitchRotation(1);
    // this.camera.transform.addRollRotation(0.1);
    // this.cubeTransform.addPitchRotation(1);
    this.clear();
    this.update();
    setTimeout(() => {
      requestAnimationFrame(this.render.bind(this));
    }, 1000 / this.fps);
  };

  update3D() {
    const gameObjects = this.gameEngine.getGameObjects();
    if (this.rotateAxisDirection !== null) {
      if (this.rotateAxisDirection === "Yaw") {
        this.axisRotator.Yaw += 1;
      } else if (this.rotateAxisDirection === "Pitch") {
        this.axisRotator.Pitch += 1;
      } else if (this.rotateAxisDirection === "Roll") {
        this.axisRotator.Roll += 1;
      }
      this.axisRotator.clamp();
    }
    if (this.rotateObjectDirection !== null) {
      if (this.rotateObjectDirection === "Clockwise") {
        this.thetaChangeDegree += 1;
      } else if (this.rotateObjectDirection === "CounterClockwise") {
        this.thetaChangeDegree -= 1;
      }
    }

    for (const gameObject of gameObjects) {
      // const updatedVertexBuffer = [];
      // console.log(this.cubeTransform.rotation.Yaw);
      if (this.thetaChangeDegree !== 0) {
      }
      const localsAxes = this.axisRotator.getLocalAxes();
      this.right = localsAxes.OutRight;
      this.n = localsAxes.OutUp;
      this.forward = localsAxes.OutForward;
      //update the modelin matrix
      this.camera.transform.update();
      drawLine(
        this.canvas,
        this.n.toVector2().scalarBy(-100),
        this.n.toVector2().scalarBy(100),
        LinearColor.Red,
      );
      drawLine(
        this.canvas,
        this.right.toVector2().scalarBy(-20),
        this.right.toVector2().scalarBy(20),
        LinearColor.Green,
      );
      drawLine(
        this.canvas,
        this.forward.toVector2().scalarBy(-20),
        this.forward.toVector2().scalarBy(20),
        LinearColor.Blue,
      );
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
    // const updatedVertexBuffers = vertexBuffers.map(buffer => {
    //   return modelMatrix.multiplyVector(buffer.toAffine(true)).toVector3();
    // });
    const updatedVertexBuffers = vertexBuffers.map(vertex => {
      const sin = Math.sin((this.thetaChangeDegree / 180) * Math.PI);
      const cos = Math.cos((this.thetaChangeDegree / 180) * Math.PI);
      const u: Vector3 = vertex;
      const udotn = u.dot(this.n);
      const ncrossu = this.n.crossProduct(u);
      const adder1 = u.scalarBy(cos);
      const adder2 = this.n.scalarBy(udotn * (1 - cos));
      const adder3 = ncrossu.scalarBy(sin);
      const result = modelMatrix
        .multiplyVector(adder1.add(adder2).add(adder3).toAffine(true))
        .toVector3();

      return result;
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

  update() {
    this.update3D();
  }

  clear() {
    this.context.clearRect(0, 0, this.width, this.height);
  }
}
