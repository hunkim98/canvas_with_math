import { Vector2 } from "../../vector/Vector2";

//Cohen-Sutherland line clipping algorithm
export const testRegion = (
  inVectorPos: Vector2,
  inMinPos: Vector2,
  inMaxPos: Vector2
) => {
  let result = 0;
  if (inVectorPos.x < inMinPos.x) {
    result = result | 0b0001;
  } else if (inVectorPos.x > inMaxPos.x) {
    result = result | 0b0010;
  }

  if (inVectorPos.y < inMinPos.y) {
    result = result | 0b0100;
  } else if (inVectorPos.y > inMaxPos.y) {
    result = result | 0b1000;
  }

  return result;
};

export const CohenSutherlandLineClip = (
  inOutStartPos: Vector2,
  inOutEndPos: Vector2,
  inMinPos: Vector2,
  inMaxPos: Vector2
) => {
  let startTest = testRegion(inOutStartPos, inMinPos, inMaxPos);
  let endTest = testRegion(inOutEndPos, inMinPos, inMaxPos);

  const width = inOutEndPos.x - inOutStartPos.x;
  const height = inOutEndPos.y - inOutStartPos.y;

  while (true) {
    if (startTest === 0 && endTest === 0) {
      return true;
    } else if (startTest & endTest) {
      return false;
    } else {
      let clippedPosition: Vector2 = new Vector2(0, 0);
      const isStartTest = startTest !== 0;
      const currentTest = isStartTest ? startTest : endTest;

      if (currentTest < 0b0100) {
        if (currentTest & 1) {
          clippedPosition.x = inMinPos.x;
        } else {
          clippedPosition.x = inMaxPos.x;
        }
        if (equalsInTolerance(height, 0)) {
          clippedPosition.y = inOutStartPos.y;
        } else {
          clippedPosition.y =
            inOutStartPos.y +
            (height * (clippedPosition.x - inOutStartPos.x)) / width;
        }
      } else {
        if (currentTest & 0b0100) {
          clippedPosition.y = inMinPos.y;
        } else {
          clippedPosition.y = inMaxPos.y;
        }
        if (equalsInTolerance(width, 0)) {
          clippedPosition.x = inOutStartPos.x;
        } else {
          clippedPosition.x =
            inOutStartPos.x +
            (width * (clippedPosition.y - inOutStartPos.y)) / height;
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
