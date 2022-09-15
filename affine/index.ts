import Canvas from "./Canvas";
import PlanetCanvas from "./PlanetCanvas";

const canvasElement = document.getElementById("canvas")!;
console.log(canvasElement);

const canvasObject = new Canvas(canvasElement as HTMLCanvasElement);

const planetCanvasElement = document.getElementById("planetCanvas")!;
console.log(planetCanvasElement);
const planetCanvasObject = new PlanetCanvas(
  planetCanvasElement as HTMLCanvasElement
);
