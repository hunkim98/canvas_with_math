import { Mesh3D } from "./mesh";
import { TransformComponent } from "./TransformComponent";

export class GameObject {
  private name: string;

  private mesh: Mesh3D;

  transform: TransformComponent;

  private hash?: string;

  isVisible: boolean = true;

  constructor(name: string, mesh: Mesh3D) {
    this.name = name;
    this.mesh = mesh;
    this.transform = new TransformComponent();
  }

  setHash(hash: string) {
    this.hash = hash;
  }

  getName() {
    return this.name;
  }

  setMesh(mesh: Mesh3D) {
    this.mesh = mesh;
  }

  getMesh() {
    return this.mesh;
  }
}
