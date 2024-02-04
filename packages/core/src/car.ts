import type { CarObject } from "./carobj";
import type { Renderer } from "./renderer";
import { createRenderer } from "./renderer";
import type { State } from "./state";
import { defineState } from "./state";

export interface Car {
  renderer: Renderer | null;
  root: CarObject;
  state: State;
  defineCanvas(element: string | HTMLCanvasElement): Car;
  play(): Car;
}

export const createCar = (root: CarObject): Car => ({
  renderer: null,
  root,
  state: defineState(new Map()),
  defineCanvas(element: string | HTMLCanvasElement) {
    this.renderer = createRenderer(
      typeof element === "string" ? document.querySelector(element) : element,
    );

    return this;
  },
  play() {
    return this;
  },
});
