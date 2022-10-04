import { Vector2 } from "../vector/Vector2";
import { Vector4 } from "../vector/Vector4";
import { CohenSutherlandLineClip, testRegion } from "./algorithms/lineClipping";
import { LinearColor } from "./Math/LinearColor";

export const drawLine = (
  canvas: HTMLCanvasElement,
  InStartPos: Vector2 | Vector4,
  InEndPos: Vector2 | Vector4,
  InColor: LinearColor = LinearColor.Black
) => {
  let clippedStart =
    InStartPos instanceof Vector2 ? InStartPos : InStartPos.toVector2();
  let clippedEnd =
    InEndPos instanceof Vector2 ? InEndPos : InEndPos.toVector2();
  const minScreen: Vector2 = new Vector2(-canvas.width / 2, -canvas.height / 2);
  const maxScreen: Vector2 = new Vector2(canvas.width / 2, canvas.height / 2);
  //line clipping algorithm
  if (
    !CohenSutherlandLineClip(clippedStart, clippedEnd, minScreen, maxScreen)
  ) {
    return;
  }
  //
  const startPoint = clippedStart.toScreenPointVector();
  const endPoint = clippedEnd.toScreenPointVector();
  const width = endPoint.x - startPoint.x;
  const height = endPoint.y - startPoint.y;

  const isGradualSlope = Math.abs(width) >= Math.abs(height);
  const dx = width >= 0 ? 1 : -1;
  const dy = height > 0 ? 1 : -1;
  const fw = dx * width;
  const fh = dy * height;

  let f = isGradualSlope ? fh * 2 - fw : 2 * fw - fh;
  const f1 = isGradualSlope ? 2 * fh : 2 * fw;
  const f2 = isGradualSlope ? 2 * (fh - fw) : 2 * (fw - fh);
  let x = startPoint.x;
  let y = startPoint.y;
  if (isGradualSlope) {
    while (x != endPoint.x) {
      drawCartesianPoint(
        canvas,
        new Vector2(x, y).toScreenPointVector(),
        InColor
      );
      if (f < 0) {
        f += f1;
      } else {
        f += f2;
        y += dy;
      }
      x += dx;
    }
  } else {
    while (y != endPoint.y) {
      drawCartesianPoint(
        canvas,
        new Vector2(x, y).toScreenPointVector(),
        InColor
      );
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

export const drawCartesianPoint = (
  canvas: HTMLCanvasElement,
  position: Vector2,
  inColor: LinearColor = LinearColor.Black
) => {
  //we draw point only on integer points
  position.y = -position.y; // invert the y axis
  const ctx = canvas.getContext("2d")!;
  const screenPointVector = position.toScreenPointVector();
  const cartesianTransformedPoint = screenPointVector.add(
    new Vector2(Math.floor(canvas.width / 2), Math.floor(canvas.height / 2))
  );
  const color = inColor.toColor32();
  ctx.fillStyle = `rgba(${color.R}, ${color.G}, ${color.B}, ${color.A})`;
  //fillrect is quick at drawing on canvas
  ctx.strokeStyle = `rgba(${color.R}, ${color.G}, ${color.B}, ${color.A})`;

  ctx.fillRect(cartesianTransformedPoint.x, cartesianTransformedPoint.y, 1, 1);
};
