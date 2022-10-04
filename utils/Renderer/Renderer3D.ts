import { Vector3 } from "../vector/Vector3";
import { Vertex3D } from "./3D/vertex";
import { drawLine } from "./Canvas";

export function drawMesh3D() {}

export function drawTriangle3d(
  canvas: HTMLCanvasElement,
  inVertices: Array<Vertex3D>,
  color: string
) {
  drawLine(canvas, inVertices[0].position, inVertices[1].position);
  drawLine(canvas, inVertices[0].position, inVertices[2].position);
  drawLine(canvas, inVertices[1].position, inVertices[2].position);
}
