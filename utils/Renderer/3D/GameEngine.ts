import { CubeMesh } from "./BasicMesh/CubeMesh";
import { CameraObject } from "./CameraObject";
import { GameObject } from "./GameObject";
import { Mesh3D } from "./mesh";

export class GameEngine {
  public static CubeMesh = CubeMesh;

  private gameObjects: Array<GameObject>;

  private mainCamera: CameraObject;

  constructor(mainCamera: CameraObject) {
    this.gameObjects = [];
    this.mainCamera = mainCamera;
  }

  createGameObject(name: string, mesh: Mesh3D) {
    const gameObject = new GameObject(name, mesh);
    this.gameObjects.push(gameObject);
    return gameObject;
  }

  getSpecificGameObject(name: string) {
    return this.gameObjects.find(go => go.getName() === name);
  }

  getGameObjects() {
    return this.gameObjects;
  }

  getMainCamera() {
    return this.mainCamera;
  }
}
