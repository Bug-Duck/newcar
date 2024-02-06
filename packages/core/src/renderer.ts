import type { CarObject } from "./carobj";

export interface Renderer {
  context: CanvasRenderingContext2D;
  render(object: CarObject): Renderer;
  clean(): Renderer;
}

export const createRenderer = (canvas: HTMLCanvasElement): Renderer => ({
  context: canvas.getContext("2d"),
  render(object: CarObject) {
    object.update(this.context);

    return this;
  },
  clean() {
    this.context.clearRect(0, 0, canvas.width, canvas.height);

    return this;
  },
});
