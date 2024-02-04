import type { CarObject } from "./carobj";

export interface Scene {
  root: CarObject;
}

export const createScene = (root: CarObject): Scene => ({
  root,
});
