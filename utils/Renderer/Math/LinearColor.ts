import { clamp } from "../../clamp";
import { Color32 } from "./Color32";

export class LinearColor {
  R: number;
  G: number;
  B: number;
  A: number;
  OneOver255 = 1 / 255;
  static White = new LinearColor(1.0, 1.0, 1.0, 1.0);
  static Black = new LinearColor(0.0, 0.0, 0.0, 1.0);

  constructor(
    inR: number = 0.0,
    inG: number = 0.0,
    inB: number = 0.0,
    inA: number = 1.0
  ) {
    this.R = inR;
    this.G = inG;
    this.B = inB;
    this.A = inA;
  }

  add(inColor: LinearColor) {
    return new LinearColor(
      this.R + inColor.R,
      this.G + inColor.G,
      this.B + inColor.B,
      this.A + inColor.A
    );
  }

  scalarBy(inScalar: number) {
    return new LinearColor(
      this.R * inScalar,
      this.G * inScalar,
      this.B * inScalar,
      this.A * inScalar
    );
  }

  toColor32() {
    const R = clamp(this.R, 0.0, 1.0);
    const G = clamp(this.G, 0.0, 1.0);
    const B = clamp(this.B, 0.0, 1.0);
    const A = clamp(this.A, 0.0, 1.0);
    return new Color32(R * 255, G * 255, B * 255, A * 255);
  }
}
