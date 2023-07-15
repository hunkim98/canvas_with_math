import Canvas from "./Canvas";

const canvasElement = document.getElementById("canvas")!;
console.log(canvasElement);

const canvasObject = new Canvas(canvasElement as HTMLCanvasElement);

const rotateYawButton = document.getElementById("rotateYaw");

rotateYawButton!.onmousedown = () => {
  canvasObject.rotateAxisOn("Yaw");
};

rotateYawButton!.onmouseup = () => {
  canvasObject.stopRotate();
};

const rotatePitchButton = document.getElementById("rotatePitch");

rotatePitchButton!.onmousedown = () => {
  canvasObject.rotateAxisOn("Pitch");
};

rotatePitchButton!.onmouseup = () => {
  canvasObject.stopRotate();
};

const rotateRollButton = document.getElementById("rotateRoll");

rotateRollButton!.onmousedown = () => {
  canvasObject.rotateAxisOn("Roll");
};

rotateRollButton!.onmouseup = () => {
  canvasObject.stopRotate();
};

const rotateClockwiseButton = document.getElementById("rotateClockwise");

rotateClockwiseButton!.onmousedown = () => {
  canvasObject.rotateLeftBasedOnAxis();
};

rotateClockwiseButton!.onmouseup = () => {
  canvasObject.stopRotate();
};

const rotateCounterClockwiseButton = document.getElementById(
  "rotateCounterClockwise",
);

rotateCounterClockwiseButton!.onmousedown = () => {
  console.log("hihihi");
  canvasObject.rotateRightBasedOnAxis();
};

rotateCounterClockwiseButton!.onmouseup = () => {
  canvasObject.stopRotate();
};
