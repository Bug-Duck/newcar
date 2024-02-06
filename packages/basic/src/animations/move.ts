import type { CarObject } from "@newcar/core";
import { defineAnimationOperationalFunction } from "@newcar/core";

export const move = defineAnimationOperationalFunction(
  (
    obj: CarObject,
    _duration: number,
    _elapsed: number,
    _context: CanvasRenderingContext2D,
    _parameters: Record<string, any>,
  ) => {
    obj.x += 10;
    obj.y += 10;
  },
);
