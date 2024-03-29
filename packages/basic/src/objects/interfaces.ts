import type { Color } from "@newcar/utils";

/**
 * The interface to show the object has a border.
 * @param borderWidth The width of the border.
 * @param borderColor The color of the border.
 */
export interface Bordered {
  borderWidth?: number;
  borderColor?: Color;
}

/**
 * The interface to show the object is fillable.
 * @param fillColor The fill color.
 */
export interface Fillable {
  fillColor?: Color;
}

/**
 * The interface to show the object has width and height.
 * @param fillColor The fill color.
 */
export interface Sized {
  width?: number;
  height?: number;
}
