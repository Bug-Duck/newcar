// Warning: The object is a excessive object without drawing.

import type { CarobjOption } from "@newcar/basic";
import { Carobj } from "@newcar/basic";

import type { DataUnit } from "./data-unit";

export type DataGroupType = "column" | "line" | "doughnut";

export class DataGroup extends Carobj {
  constructor(
    public type: DataGroupType,
    public members: DataUnit[],
    options?: CarobjOption,
  ) {
    super(options);
  }
}
