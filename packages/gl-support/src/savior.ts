import type { Color } from "@newcar/utils/src";

export class Savior {
  x: number;
  y: number;
  color: Color;
  lineWidth: number;
  constructor(options: {
    x: number;
    y: number;
    color: Color;
    lineWidth: number;
  }) {
    this.x = options.x;
    this.y = options.y;
    this.color = options.color;
    this.lineWidth = options.lineWidth;
  }
}
