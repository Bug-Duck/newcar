import type { ILengthofAxisX, ILengthofAxisY } from "@newcar/objects/src/objects/coordinateSystem/interface";
import type { AnimationBuilder } from "..";
import { Interpolator } from "../interpolation/Interpolator";
import { LinearInterpolator } from "../interpolation/LinearInterpolator";
import { AnimationBuilderItem } from "../item";

export class AxisLength extends AnimationBuilderItem {

  #obj: ILengthofAxisX & ILengthofAxisY;
  #interpolator_positive_x: Interpolator;
  #interpolator_positive_y: Interpolator;
  #interpolator_negative_x: Interpolator;
  #interpolator_negative_y: Interpolator;
  #length: number;
  #start: number;
  #from: number[];
  #to: number[];
  #by: (x: number) => number

  constructor(datas: {
    startAt?: number;
    lastsFor?: number;
    from?: [number, number, number, number];
    to?: [number, number, number, number];
    bindTo?: ILengthofAxisX & ILengthofAxisY;
    by?: (x: number) => number;
  }) {
    super();
    let flag = "";
    if (
      ((flag = "startAt"), datas.startAt === undefined) ||
      ((flag = "lastsFor"), datas.lastsFor === undefined) ||
      ((flag = "to"), datas.to === undefined) ||
      ((flag = "bindTo"), datas.bindTo === undefined)
    ) {
      throw new Error(`be unset data "${flag}"`);
    }
    this.#obj = datas.bindTo; 
    this.#from = datas.from || [this.#obj.axisPositiveXLength, this.#obj.axisPositiveYLength, this.#obj.axisNegativeXLength, this.#obj.axisNegativeYLength];
    this.#to = datas.to;
    this.#length = datas.lastsFor;
    this.#start = datas.startAt;
    this.#by = datas.by ?? LinearInterpolator

    this.#interpolator_positive_x = new Interpolator(
      this.#from[0],
      this.#to[0],
      this.#by
    );
    this.#interpolator_positive_y = new Interpolator(
      this.#from![1], 
      this.#to[1], 
      this.#by
    );
    this.#interpolator_negative_x = new Interpolator(
      this.#from[2],
      this.#to[2],
      this.#by
    );
    this.#interpolator_negative_y = new Interpolator(
      this.#from![3], 
      this.#to[3], 
      this.#by
    );
  };


  onDrawFrame(relativeFrameCount: number, _parent: AnimationBuilder): void {
    this.#obj.axisPositiveXLength = this.#interpolator_positive_x.interpolate(
      (relativeFrameCount + 1) / this.#length,
    );
    this.#obj.axisPositiveYLength = this.#interpolator_positive_y.interpolate(
      (relativeFrameCount + 1) / this.#length,
    );
    this.#obj.axisNegativeXLength = this.#interpolator_negative_x.interpolate(
      (relativeFrameCount + 1) / this.#length,
    );
    this.#obj.axisNegativeYLength = this.#interpolator_negative_y.interpolate(
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