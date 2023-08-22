import type {
  ILengthofAxisX,
  ILengthofAxisY,
} from "@newcar/objects/src/objects/coordinateSystem/interface";

import type { AnimationBuilder } from "..";
import { Interpolator } from "../interpolation/Interpolator";
import { LinearInterpolator } from "../interpolation/LinearInterpolator";
import { AnimationBuilderItem } from "../item";

export class AxisLimit extends AnimationBuilderItem {
  #obj: ILengthofAxisX & ILengthofAxisY;
  #interpolator_x_max: Interpolator;
  #interpolator_y_max: Interpolator;
  #interpolator_x_min: Interpolator;
  #interpolator_y_min: Interpolator;
  #length: number;
  #start: number;
  #from: number[];
  #to: number[];
  #by: (x: number) => number;

  constructor(datas: {
    startAt?: number;
    lastsFor?: number;
    from?: [number, number, number, number];
    to?: [number, number, number, number];
    bindTo?: ILengthofAxisX & ILengthofAxisY;
    by?: (x: number) => number;
  }) {
    super();
    if (
      datas.bindTo === undefined ||
      datas.to === undefined ||
      datas.lastsFor === undefined ||
      datas.startAt === undefined
    ) {
      throw new Error("This animation is missing necessary values");
    }
    this.#obj = datas.bindTo;
    this.#from = datas.from || [
      this.#obj.axisPositiveXLength,
      this.#obj.axisPositiveYLength,
      this.#obj.axisNegativeXLength,
      this.#obj.axisNegativeYLength,
    ];
    this.#to = datas.to;
    this.#length = datas.lastsFor;
    this.#start = datas.startAt;
    this.#by = datas.by ?? LinearInterpolator;

    this.#interpolator_x_max = new Interpolator(this.#from[0], this.#to[0], this.#by);
    this.#interpolator_y_max = new Interpolator(this.#from![1], this.#to[1], this.#by);
    this.#interpolator_x_min = new Interpolator(this.#from[2], this.#to[2], this.#by);
    this.#interpolator_y_min = new Interpolator(this.#from![3], this.#to[3], this.#by);
  }

  onDrawFrame(relativeFrameCount: number, _parent: AnimationBuilder): void {
    this.#obj.axisPositiveXLength = this.#interpolator_x_max.interpolate(
      (relativeFrameCount + 1) / this.#length,
    );
    this.#obj.axisPositiveYLength = this.#interpolator_y_max.interpolate(
      (relativeFrameCount + 1) / this.#length,
    );
    this.#obj.axisNegativeXLength = this.#interpolator_x_min.interpolate(
      (relativeFrameCount + 1) / this.#length,
    );
    this.#obj.axisNegativeYLength = this.#interpolator_y_min.interpolate(
      (relativeFrameCount + 1) / this.#length,
    );
  }

  get startFrame(): number {
    return this.#start;
  }

  get length(): number {
    return this.#length;
  }
}
