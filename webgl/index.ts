import Canvas from "./Canvas";

const canvasElement = document.getElementById("canvas")!;
console.log(canvasElement);

const canvasObject = new Canvas(canvasElement as HTMLCanvasElement);
