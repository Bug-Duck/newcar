import type { Handler } from "../handler";

export class CustomHandler implements Handler {
  constructor(public callback: () => any | void) {}
  handle(): void {
    this.callback();
  }
}
