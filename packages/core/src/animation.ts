import type { CarObject } from "./carobj";

export interface Animation {
  obj: CarObject;
  duration: number;
  elapsed: number;
  operation: AnimationOperationalFunction;
}

export type AnimationOperationalFunction = (
  obj: CarObject,
  duration: number,
  elapsed: number,
  context?: CanvasRenderingContext2D,
) => void;

export const createAnimation = (
  obj: CarObject,
  duration: number,
  operation: AnimationOperationalFunction,
): Animation => ({
  obj,
  duration,
  elapsed: 0,
  operation,
});
