import { Vector2d } from "../types/vector";
import { xAxisReflectVector2d } from "./tranform2d";

export const TransformToCartesian2d = () => {
  function inner(
    target: any,
    propertyKey: string,
    descriptor: TypedPropertyDescriptor<(x: number, y: number) => void>,
  ) {
    const method = descriptor.value!;
    descriptor.value = function (...args: Vector2d) {
      const reflectedVector = xAxisReflectVector2d(args);
      return method.apply(this, reflectedVector);
    };
  }
  return inner;
};
