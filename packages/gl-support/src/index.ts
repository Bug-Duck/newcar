import { FastGLRenderingContext } from "./context";

export const createFastGLContext = (
  element: HTMLCanvasElement,
): FastGLRenderingContext => new FastGLRenderingContext(element);
