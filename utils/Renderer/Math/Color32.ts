import { clamp } from "../../clamp";

//https://stackoverflow.com/questions/17945972/converting-rgba-values-into-one-integer-in-javascript

export class Color32 {
  R: number;
  G: number;
  B: number;
  A: number;
  constructor(inR: number, inG: number, inB: number, inA: number = 255) {
    this.R = inR;
    this.G = inG;
    this.B = inB;
    this.A = inA;
  }

  static hexToColor32(pixelValue: number) {
    const red = (pixelValue >> 24) & 0xff,
      green = (pixelValue >> 16) & 0xff,
      blue = (pixelValue >> 8) & 0xff,
      alpha = pixelValue & 0xff;
    return new Color32(red, green, blue, alpha);
  }

  toColorValue() {
    const r = this.R & 0xff;
    const g = this.G & 0xff;
    const b = this.B & 0xff;
    const a = this.A & 0xff;

    const rgb = (r << 24) + (g << 16) + (b << 8) + a;
    return rgb;
  }

  add(color32: Color32) {
    const R = clamp(this.R + color32.R, 0, 255);
    const G = clamp(this.G + color32.G, 0, 255);
    const B = clamp(this.B + color32.B, 0, 255);
    const A = clamp(this.A + color32.A, 0, 255);
    return new Color32(R, G, B, A);
  }
}
