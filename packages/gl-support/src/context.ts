import { Color } from "@newcar/utils/src";
import { mat4 } from "gl-matrix";

import { strokeLine } from "./elements/strokeLine";
import { Savior } from "./savior";

interface Trajectory {
  type: "lineTo" | "moveTo";
  from?: [number, number]; // Only `lineTo` type.
  to?: [number, number]; // Only `lineTo` type.
  x?: number;
  y?: number;
}

export class FastGLRenderingContext {
  #element: HTMLCanvasElement;
  #webGLContext: WebGLRenderingContext;
  #program: WebGLProgram;
  #memory: Savior[] = [];
  #trajectory: Trajectory[] = [];

  #projMat4: mat4 | null = null;

  x = 0;
  y = 0;
  lineWidth = 1;
  strokeColor = Color.WHITE;

  constructor(element: HTMLCanvasElement) {
    this.#element = element;
    if (this.#element.getContext) {
      this.#webGLContext = this.#element.getContext("webgl")!;
      this.#webGLContext?.viewport(
        0,
        0,
        this.#element.width,
        this.#element.height,
      );
      this.#projMat4 = mat4.create();
      this.#program = this.#webGLContext.createProgram()!;
      mat4.ortho(
        this.#projMat4,
        0,
        this.#element.width,
        this.#element.height,
        0,
        1.0,
        -1.0,
      );
    }
  }

  save(): this {
    this.#memory.push(
      new Savior({
        x: this.x,
        y: this.y,
        color: this.strokeColor,
        lineWidth: this.lineWidth,
      }),
    );

    return this;
  }

  restore(): this {
    this.x = this.#memory[this.#memory.length - 1].x;
    this.y = this.#memory[this.#memory.length - 1].y;
    this.strokeColor = this.#memory[this.#memory.length - 1].color;
    this.lineWidth = this.#memory[this.#memory.length - 1].lineWidth;

    return this;
  }

  lineTo(x: number, y: number): this {
    this.#trajectory.push({
      type: "lineTo",
      from: [this.x, this.y],
      to: [x, y],
    });
    this.x = x;
    this.y = y;

    return this;
  }

  beginPath(): this {
    this.#trajectory = [];

    return this;
  }

  stroke(): this {
    const lines = [];
    for (const i of this.#trajectory) {
      switch (i.type) {
        case "lineTo": {
          lines.push(i.from![0], i.from![1], 0, i.to![0], i.to![1], 0);
          this.#program = this.#webGLContext.createProgram()!;
          break;
        }
      }
    }
    strokeLine(this, lines);

    return this;
  }

  moveTo(x: number, y: number): this {
    this.#trajectory.push({
      type: "moveTo",
      to: [x, y],
    });
    this.x = x;
    this.y = y;

    return this;
  }

  get program(): WebGLProgram {
    return this.#program;
  }

  get webgl(): WebGLRenderingContext {
    return this.#webGLContext;
  }

  get proj(): mat4 {
    return this.#projMat4!;
  }
}
