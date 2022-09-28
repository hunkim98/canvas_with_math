export class Rotator {
  Yaw: number = 0;
  Roll: number = 0;
  Pitch: number = 0;

  static GetAxisClampedValue(InRotatorValue: number) {
    let angle = InRotatorValue % 360;
    if (angle < 0) {
      angle += 360;
    }
    return angle;
  }

  Clamp() {
    this.Yaw = Rotator.GetAxisClampedValue(this.Yaw);
    this.Roll = Rotator.GetAxisClampedValue(this.Roll);
    this.Pitch = Rotator.GetAxisClampedValue(this.Pitch);
  }
}
