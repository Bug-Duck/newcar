import type { Car } from "./car";

export interface Handler {
  handle: (car: Car) => any | void;
  get duration(): number;
}
