import type { CarObject } from "./carobj";
import type { Handler } from "./handler";
import type { State } from "./state";
import { defineState } from "./state";

export interface Scene {
  root: CarObject;
  elapsed: number;
  state: State;
  addHandler: (handler: Handler) => Scene;
}

export const createScene = (root: CarObject): Scene => ({
  root,
  elapsed: 0,
  state: defineState(new Map()),
  addHandler(handler: Handler) {
    for (let d = 0; d <= handler.duration; d += 1) {
      if (typeof this.state.state.get(this.elapsed + d) === "undefined") {
        this.state.state.set(this.elapsed + d, []);
      }
      this.state.state.get(this.elapsed + d).push(handler);
    }

    return this;
  },
});
