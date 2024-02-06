import type { Config } from "./config";
import { defineConfig } from "./config";
import type { Renderer } from "./renderer";
import { createRenderer } from "./renderer";
import type { Scene } from "./scene";

export interface Car {
  renderer: Renderer | null;
  scene: Scene;
  set(element: string | HTMLCanvasElement): Car;
  play(): Car;
  pause(): Car;
  update(car: Car): Car;
  checkout(scene: Scene): Car;
  config: Config;
  playing: boolean;
}

export const createCar = (scene: Scene): Car => ({
  renderer: null,
  scene,
  config: defineConfig({}),
  playing: false,
  set(element: string | HTMLCanvasElement) {
    this.renderer = createRenderer(
      typeof element === "string" ? document.querySelector(element) : element,
    );

    return this;
  },
  update(car: Car) {
    this.renderer.clean();
    this.scene.elapsed += 1;
    const handlers = this.scene.state.state.get(this.scene.elapsed);
    if (typeof handlers !== "undefined") {
      for (const handler of handlers) {
        handler.handle(car);
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
  checkout(scene: Scene): Car {
    this.scene = scene;

    return this;
  },
});
