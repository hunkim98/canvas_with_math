import Canvas from "./Canvas";
import { ImageObservable, ImageObserver } from "./imageObservable";


const canvasElement = document.getElementById("canvas")!;
console.log(canvasElement);


const extractPCAObserver = new ImageObserver((imageData, imageWidth, imageHeight) => {
  console.log("extractPCAObserver is notified!");
});

const canvasObject = new Canvas(canvasElement as HTMLCanvasElement, extractPCAObserver);

const toggleButton = document.getElementById("toggleButton");



toggleButton!.onclick = () => {
  canvasObject.toggleColorMode();
};
