export class Savior {
  x: number;
  y: number;
  r: number;
  g: number;
  b: number;
  a: number;
  lineWidth: number;
  constructor(options: {
    x: number;
    y: number;
    r: number;
    g: number;
    b: number;
    a: number;
    lineWidth: number;
  }) {
    this.x = options.x;
    this.y = options.y;
    this.r = options.r;
    this.g = options.g;
    this.b = options.b;
    this.a = options.a;
    this.lineWidth = options.lineWidth;
  }
}
