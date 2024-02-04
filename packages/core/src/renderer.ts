import type { CarObject } from "./carobj";

export interface Renderer {
  context: CanvasRenderingContext2D;
  render(object: CarObject): void;
}

export const createRenderer = (canvas: HTMLCanvasElement): Renderer => ({
  context: canvas.getContext("2d"),
  render(object: CarObject) {
    object.update(this.context);
  },
});
