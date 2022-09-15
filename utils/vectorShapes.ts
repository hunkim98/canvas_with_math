import { Vector2d } from "../types/vector";
import { toScreenPointVector } from "./screen";
import { returnVectorSize } from "./vectorFunctions";

export const drawPoint = (
  ctx: CanvasRenderingContext2D,
  position: Vector2d,
  color: { r: number; g: number; b: number; a: number }
) => {
  //we draw point only on integer points
  const screenPointVector = toScreenPointVector(position);
  ctx.fillStyle = `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`;
  //   ctx.fillStyle = "black";
  //fillrect is quick at drawing on canvas
  ctx.fillRect(screenPointVector[0], screenPointVector[1], 1, 1);
};

export const createRectVectors = (width: number, height: number) => {
  const vectors: Vector2d[] = [];
  for (let x = -width / 2; x <= width / 2; ++x) {
    for (let y = -height / 2; y <= height / 2; ++y) {
      vectors.push([x, y]);
    }
  }
  return vectors;
};

export const createCircleVectors = (radius: number) => {
  const vectors: Vector2d[] = [];
  for (let x = -radius; x <= radius; ++x) {
    for (let y = -radius; y <= radius; ++y) {
      const pointToTest: Vector2d = [x, y];
      const squaredLength = returnVectorSize(pointToTest);
      if (squaredLength < radius * radius) {
        vectors.push(pointToTest);
      }
    }
  }
  return vectors;
};
