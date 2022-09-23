import { Vector2d } from "../types/vector";

//Cohen-Sutherland line clipping algorithm
export const testRegion = (
  inVectorPos: Vector2d,
  inMinPos: Vector2d,
  inMaxPos: Vector2d
) => {
  let result = 0;
  if (inVectorPos[0] < inMinPos[0]) {
    result = result | 0b0001;
  } else if (inVectorPos[0] > inMaxPos[0]) {
    result = result | 0b0010;
  }

  if (inVectorPos[1] < inMinPos[1]) {
    result = result | 0b0100;
  } else if (inVectorPos[1] > inMaxPos[1]) {
    result = result | 0b1000;
  }

  return result;
};

export const CohenSutherlandLineClip = (
  inOutStartPos: Vector2d,
  inOutEndPos: Vector2d,
  inMinPos: Vector2d,
  inMaxPos: Vector2d
) => {
  let startTest = testRegion(inOutStartPos, inMinPos, inMaxPos);
  let endTest = testRegion(inOutEndPos, inMinPos, inMaxPos);

  const width = inOutEndPos[0] - inOutStartPos[0];
  const height = inOutEndPos[1] - inOutStartPos[1];

  while (true) {
    if (startTest === 0 && endTest === 0) {
      return true;
    } else if (startTest & endTest) {
      return false;
    } else {
      let clippedPosition: Vector2d = [0, 0];
      const isStartTest = startTest !== 0;
      const currentTest = isStartTest ? startTest : endTest;

      if (currentTest < 0b0100) {
        if (currentTest & 1) {
          clippedPosition[0] = inMinPos[0];
        } else {
          clippedPosition[0] = inMaxPos[0];
        }
        if (equalsInTolerance(height, 0)) {
          clippedPosition[1] = inOutStartPos[1];
        } else {
          clippedPosition[1] =
            inOutStartPos[1] +
            (height * (clippedPosition[0] - inOutStartPos[0])) / width;
        }
      } else {
        if (currentTest & 0b0100) {
          clippedPosition[1] = inMinPos[1];
        } else {
          clippedPosition[1] = inMaxPos[1];
        }
        if (equalsInTolerance(width, 0)) {
          clippedPosition[0] = inOutStartPos[0];
        } else {
          clippedPosition[0] =
            inOutStartPos[0] +
            (width * (clippedPosition[1] - inOutStartPos[1])) / height;
        }
      }
      if (isStartTest) {
        inOutStartPos = clippedPosition;
        startTest = testRegion(inOutStartPos, inMinPos, inMaxPos);
      } else {
        inOutEndPos = clippedPosition;
        endTest = testRegion(inOutEndPos, inMinPos, inMaxPos);
      }
    }
  }
  return true;
};

const SMALL_NUMBER = 0.00000001;
export const equalsInTolerance = (
  number1: number,
  number2: number,
  intolerance: number = SMALL_NUMBER
) => {
  return Math.abs(number2 - number1) <= intolerance;
};
