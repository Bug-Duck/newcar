import type { CarobjOption } from "@newcar/basic";
import { Carobj, Line } from "@newcar/basic";

import type { DataGroup } from "./units/data-group";

export interface BarOption extends CarobjOption {
  division: number;
}

export class Bar extends Carobj {
  division = 1;

  constructor(public data: DataGroup[], options?: BarOption) {
    super(options);
  }

  draw(context: CanvasRenderingContext2D): void {
    context.save();
    // Scale the coordinate system to make the chart keep stay at his center.
    context.scale(1, -1);

    const maxValue = Math.max(
      ...this.data.map((datum1) => {
        return Math.max(
          ...datum1.members.map((datum2) => {
            return datum2.value;
          }),
        );
      }),
    );
    const minValue = Math.min(
      ...this.data.map((datum1) => {
        return Math.min(
          ...datum1.members.map((datum2) => {
            return datum2.value;
          }),
        );
      }),
    );
    context.restore();
  }
}
