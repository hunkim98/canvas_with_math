import { Vector2d } from "../types/vector";
import { CohenSutherlandLineClip } from "./lineClipping";
import { toScreenPointVector } from "./screen";

import { addVectors, returnVectorSize } from "./vectorFunctions";

export const drawLine = (
  canvas: HTMLCanvasElement,
  InStartPos: Vector2d,
  InEndPos: Vector2d
) => {
  let clippedStart = InStartPos;
  let clippedEnd = InEndPos;
  const minScreen: Vector2d = [-canvas.width / 2, -canvas.height / 2];
  const maxScreen: Vector2d = [canvas.width / 2, canvas.height / 2];
  //line clipping algorithm
  if (
    !CohenSutherlandLineClip(clippedStart, clippedEnd, minScreen, maxScreen)
  ) {
    return;
  }
  //
  const startPoint = toScreenPointVector(clippedStart);
  const endPoint = toScreenPointVector(clippedEnd);
  const width = endPoint[0] - startPoint[0];
  const height = endPoint[1] - startPoint[1];

  const isGradualSlope = Math.abs(width) >= Math.abs(height);
  const dx = width >= 0 ? 1 : -1;
  const dy = height > 0 ? 1 : -1;
  const fw = dx * width;
  const fh = dy * height;

  let f = isGradualSlope ? fh * 2 - fw : 2 * fw - fh;
  const f1 = isGradualSlope ? 2 * fh : 2 * fw;
  const f2 = isGradualSlope ? 2 * (fh - fw) : 2 * (fw - fh);
  let x = startPoint[0];
  let y = startPoint[1];
  if (isGradualSlope) {
    while (x != endPoint[0]) {
      drawCartesianPoint(canvas, toScreenPointVector([x, y]) as Vector2d);
      if (f < 0) {
        f += f1;
      } else {
        f += f2;
        y += dy;
      }
      x += dx;
    }
  } else {
    while (y != endPoint[1]) {
      drawCartesianPoint(canvas, toScreenPointVector([x, y]) as Vector2d);
      if (f < 0) {
        f += f1;
      } else {
        f += f2;
        x += dx;
      }
      y += dy;
    }
  }
};

export const drawCartesianLineByContext = (
  canvas: HTMLCanvasElement,
  startPoint: Vector2d,
  endPoint: Vector2d,
  stroke = "black",
  storkeWidth = 1
) => {
  const context = canvas.getContext("2d")!;
  const cartesianTransformedStartPoint = addVectors(startPoint, [
    Math.floor(canvas.width / 2),
    Math.floor(canvas.height / 2),
  ]);
  const cartesianTransformedEndPoint = addVectors(endPoint, [
    Math.floor(canvas.width / 2),
    Math.floor(canvas.height / 2),
  ]);
  context.strokeStyle = stroke;
  context.lineWidth = storkeWidth;
  context.beginPath();
  context.moveTo(
    cartesianTransformedStartPoint[0],
    cartesianTransformedStartPoint[1]
  );
  context.lineTo(
    cartesianTransformedEndPoint[0],
    cartesianTransformedEndPoint[1]
  );
  context.stroke();
};

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
  position: Vector2d,
  color: { r: number; g: number; b: number; a: number } = {
    r: 0,
    g: 0,
    b: 0,
    a: 255,
  }
) => {
  //we draw point only on integer points
  position[1] = -position[1]; // invert the y axis
  const ctx = canvas.getContext("2d")!;
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
