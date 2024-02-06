import type { CarObject } from "./carobj";

export interface Animation {
  obj: CarObject;
  duration: number;
  elapsed: number;
  operation: AnimationOperationalFunction;
  parameters: Record<string, any>;
}

export type AnimationOperationalFunction = (
  obj: CarObject,
  duration: number,
  elapsed: number,
  context: CanvasRenderingContext2D,
  parameters: Record<string, any>,
) => void;

export const createAnimation = (
  obj: CarObject,
  operation: AnimationOperationalFunction,
  duration: number,
  parameters?: Record<string, any>,
): Animation => ({
  obj,
  duration,
  elapsed: 0,
  operation,
  parameters: parameters ?? {},
});

export const defineAnimationOperationalFunction = (
  operation: AnimationOperationalFunction,
): AnimationOperationalFunction => operation;
