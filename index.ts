import * as observableTest from "./observableTest";
import matrixTestCanvas from "./matrixTest/Canvas";

observableTest;

const matrixTestCanvasElement = document.getElementById("matrixTest")!;
console.log(matrixTestCanvasElement);

const matrixTestCanvasObject = new matrixTestCanvas(
  matrixTestCanvasElement as HTMLCanvasElement
);
