// Warning: The object is a excessive object without drawing.

import type { CarobjOption } from "@newcar/basic";
import { Carobj } from "@newcar/basic";
import type { Color } from "@newcar/utils";

export interface DataUnitOption extends CarobjOption {
  color: Color;
}

export class DataUnit extends Carobj {
  constructor(
    public key: string,
    public value: number,
    options?: DataUnitOption,
  ) {
    super(options);
  }
}
