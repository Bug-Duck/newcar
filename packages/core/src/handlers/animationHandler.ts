import type { Animation } from "../animation";
import type { Car } from "../car";
import type { CarObject } from "../carobj";
import type { Handler } from "../handler";

export class AnimationHandler implements Handler {
  constructor(
    public obj: CarObject,
    public animation: Animation,
    public start: number,
    public now: number,
    public duration: number,
  ) {}

  handle(car: Car): void {
    this.animation.operation(
      this.obj,
      this.duration,
      this.now - this.start,
      car.renderer.context,
    );
    this.now += 1;
  }
}
