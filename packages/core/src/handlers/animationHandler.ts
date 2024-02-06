import type { Animation } from "../animation";
import type { Car } from "../car";
import type { Handler } from "../handler";

export class AnimationHandler implements Handler {
  duration: number;

  constructor(
    public animation: Animation,
    public start: number,
    public now: number,
  ) {
    this.duration = this.animation.duration;
  }

  handle(car: Car): void {
    this.animation.operation(
      this.animation.obj,
      this.animation.duration,
      this.now - this.start,
      car.renderer.context,
      this.animation.parameters,
    );
    this.now += 1;
  }
}
