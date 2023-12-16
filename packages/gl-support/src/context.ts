/* eslint-disable object-shorthand */
import { mat4 } from "gl-matrix";

import { lineStroke } from "./line";
import { Savior } from "./savior";

export class FastGLRenderingContext {
  #element: HTMLCanvasElement;
  #webGLContext: WebGLRenderingContext;
  #program: WebGLProgram;
  #memory: Savior[] = [];
  #trajectory: {
    type: "lineTo" | "moveTo";
    from?: [number, number]; // Only `lineTo` type.
    to?: [number, number]; // Only `lineTo` type.
    x?: number;
    y?: number;
  }[] = [];

  #projMat4: mat4 | null = null;

  x = 0;
  y = 0;
  lineWidth = 1;
  r = 0;
  g = 0;
  b = 0;
  a = 1;

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
        r: this.r,
        g: this.g,
        b: this.b,
        a: this.a,
        lineWidth: this.lineWidth,
      }),
    );

    return this;
  }

  restore(): this {
    this.x = this.#memory[length - 1].x;
    this.y = this.#memory[length - 1].y;
    this.r = this.#memory[length - 1].r;
    this.g = this.#memory[length - 1].g;
    this.b = this.#memory[length - 1].b;
    this.a = this.#memory[length - 1].a;
    this.lineWidth = this.#memory[length - 1].lineWidth;

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
    for (const i of this.#trajectory) {
      if (i.type === "lineTo") {
        lineStroke(this, i.from!, i.to!);
        // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
        this.#program = this.#webGLContext?.createProgram()!;
      } else if (i.type === "dot") {
        dotStroke(this, i.x!, i.y!);
        // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
        this.#program = this.#webGLContext?.createProgram()!;
      }
    }

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

  setStrokeColor(r: number, g: number, b: number, a: number): this {
    this.r = r / 255;
    this.g = g / 255;
    this.b = b / 255;
    this.a = a;

    return this;
  }

  setLineWidth(value: number): this {
    this.lineWidth = value;

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
