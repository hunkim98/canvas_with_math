import { Vector2d } from "../types/vector";
import { toScreenPointVector } from "./screen";
import { addVectors, returnVectorSize } from "./vectorFunctions";

export const drawPoint = (
  canvas: HTMLCanvasElement,
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
  // const pixelData = ctx.getImageData(
  //   -canvas.width / 2,
  //   -canvas.height / 2,
  //   canvas.width / 2,
  //   canvas.height / 2
  // );
  // const data = pixelData.data;
};

export const drawCartesianPoint = (
  canvas: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D,
  position: Vector2d,
  color: { r: number; g: number; b: number; a: number }
) => {
  //we draw point only on integer points
  const screenPointVector = toScreenPointVector(position);
  const cartesianTransformedPoint = addVectors(screenPointVector, [
    Math.floor(canvas.width / 2),
    Math.floor(canvas.height / 2),
  ]);
  ctx.fillStyle = `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`;
  //   ctx.fillStyle = "black";
  //fillrect is quick at drawing on canvas
  ctx.strokeStyle = `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`;

  ctx.fillRect(
    cartesianTransformedPoint[0],
    cartesianTransformedPoint[1],
    1,
    1
  );
  // const pixelData = ctx.getImageData(
  //   -canvas.width / 2,
  //   -canvas.height / 2,
  //   canvas.width / 2,
  //   canvas.height / 2
  // );
  // const data = pixelData.data;
};

export const drawCartesianPointByPixel = (
  canvas: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D,
  position: Vector2d,
  color: { r: number; g: number; b: number; a: number }
) => {
  const screenPointVector = toScreenPointVector(position);
  const cartesianTransformedPoint = addVectors(screenPointVector, [
    Math.floor(canvas.width / 2),
    Math.floor(canvas.height / 2),
  ]);
  //getImageData should be used for disfiguring pixels
  const pixelData = ctx.getImageData(
    cartesianTransformedPoint[0],
    cartesianTransformedPoint[1],
    1,
    1
  );
  const data = pixelData.data;
  data[0] = color.r;
  data[1] = color.g;
  data[2] = color.b;
  data[3] = 255;
  ctx.putImageData(
    pixelData,
    cartesianTransformedPoint[0],
    cartesianTransformedPoint[1]
  );
  // ctx.fillStyle = `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`;
  // ctx.fillRect(
  //   cartesianTransformedPoint[0],
  //   cartesianTransformedPoint[1],
  //   1,
  //   1
  // );
};

export const createRectVectors = (width: number, height: number) => {
  const vectors: Vector2d[] = [];
  for (let x = -width / 2; x <= width / 2; x = x + 1) {
    for (let y = -height / 2; y <= height / 2; y = y + 1) {
      vectors.push([x, y]);
    }
  }
  return vectors;
};

export const createCircleVectors = (radius: number) => {
  const vectors: Vector2d[] = [];
  for (let x = -radius; x <= radius; x = x + 1) {
    for (let y = -radius; y <= radius; y = y + 1) {
      const pointToTest: Vector2d = [x, y];
      const squaredLength = returnVectorSize(pointToTest);
      if (squaredLength < radius * radius) {
        vectors.push(pointToTest);
      }
    }
  }
  return vectors;
};
