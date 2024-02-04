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
  defineCanvas(element: string | HTMLCanvasElement): Car;
  play(): Car;
  pause(): Car;
  update(): Car;
  config: Config;
  isPlaying: boolean;
  playing: boolean;
}

export const createCar = (scene: Scene): Car => ({
  renderer: null,
  scene,
  state: defineState(new Map()),
  config: defineConfig({}),
  isPlaying: false,
  elapsed: 0,
  defineCanvas(element: string | HTMLCanvasElement) {
    this.renderer = createRenderer(
      typeof element === "string" ? document.querySelector(element) : element,
    );

    return this;
  },
  play() {
    this.isPlaying = true;

    return this;
  },
  pause() {
    this.isPlaying = false;

    return this;
  },
  update() {
    this.renderer.render(this.scene.root);
    if (this.isPlaying) {
      requestAnimationFrame(this.update);
    }

    return this;
  },
  set playing(value: boolean) {
    this.isPlaying = value;
    if (this.isPlaying) {
      requestAnimationFrame(this.update);
    }
  },
  get playing() {
    return this.isPlaying;
  },
});
