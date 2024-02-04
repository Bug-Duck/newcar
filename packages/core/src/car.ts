import type { Config } from "./config";
import { defineConfig } from "./config";
import type { Renderer } from "./renderer";
import { createRenderer } from "./renderer";
import type { Scene } from "./scene";
import type { State } from "./state";
import { defineState } from "./state";

export interface Car {
  renderer: Renderer | null;
  scene: Scene;
  state: State;
  elapsed: number;
  set(element: string | HTMLCanvasElement): Car;
  play(): Car;
  pause(): Car;
  update(car: Car): Car;
  config: Config;
  playing: boolean;
}

export const createCar = (scene: Scene): Car => ({
  renderer: null,
  scene,
  state: defineState(new Map()),
  config: defineConfig({}),
  playing: false,
  elapsed: 0,
  set(element: string | HTMLCanvasElement) {
    this.renderer = createRenderer(
      typeof element === "string" ? document.querySelector(element) : element,
    );

    return this;
  },
  update(car: Car) {
    this.elapsed += 1;
    const handlers = this.state.state.get(this.elapsed);
    if (typeof handlers !== "undefined") {
      for (const handler of handlers) {
        handler.handle();
      }
    }
    this.renderer.render(car.scene.root);
    if (this.playing) {
      requestAnimationFrame(() => this.update(this));
    }

    return this;
  },
  play() {
    this.playing = true;
    requestAnimationFrame(() => this.update(this));

    return this;
  },
  pause() {
    this.playing = false;

    return this;
  },
});
