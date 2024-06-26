import type {
  StrokeCap,
  StrokeJoin,
} from '@newcar/basic'
import {
  Line,
  str2StrokeCap,
  str2StrokeJoin,
} from '@newcar/basic'
import type { WidgetOptions, WidgetStyle } from '@newcar/core'
import { Widget } from '@newcar/core'
import { Color } from '@newcar/utils'
import type { CanvasKit, Paint } from 'canvaskit-wasm'

export interface AngleOptions extends WidgetOptions {
  style?: AngleStyle
  unitSystem?: 'angle' | 'radian'
}

export interface AngleStyle extends WidgetStyle {
  color?: Color
  graduatedArc?: boolean
  join?: StrokeJoin
  cap?: StrokeCap
  width?: number
}

export class Angle extends Widget {
  unitSystem: 'angle' | 'radian'
  declare style: AngleStyle
  paint: Paint
  endSide: Line
  private endX: number
  private endY: number
  constructor(
    public basis: Line,
    public value: number,
    public length: number,
    options?: AngleOptions,
  ) {
    options ??= {}
    super(options)
    this.unitSystem = options.unitSystem ?? 'angle'
    options.style ??= {}
    this.style.width = options.style.width ?? 2
    this.style.color = options.style.color ?? Color.WHITE
    this.style.graduatedArc = options.style.graduatedArc ?? true
    this.style.join = options.style.join ?? 'miter'
    this.style.cap = options.style.cap ?? 'square'
    this.endX = this.basis.to[0] + length * Math.cos(this.value)
    this.endY = this.basis.to[1] + length * Math.sin(this.value)
    this.endSide = new Line(this.basis.from, [this.endX, this.endY])
    this.add(this.basis, this.endSide)
  }

  init(ck: CanvasKit): void {
    this.paint = new ck.Paint()
    this.paint.setColor(this.style.color!.toFloat4())
    this.paint.setStrokeJoin(str2StrokeJoin(ck, this.style.join!))
    this.paint.setStrokeCap(str2StrokeCap(ck, this.style.cap!))
  }

  predraw(ck: CanvasKit, propertyChanged: string): void {
    switch (propertyChanged) {
      case 'value': {
        this.endX = this.basis.to[0] + length * Math.cos(this.value)
        this.endY = this.basis.to[1] + length * Math.sin(this.value)
        this.endSide.to = [this.endX, this.endY]
        break
      }
    }
  }
}
