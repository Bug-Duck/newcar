import type { Canvas, CanvasKit, Paint, Path, RRect } from 'canvaskit-wasm'
import { Figure, FigureOptions, FigureStyle } from './figure'
import { Vector2 } from '../../utils/vector2'

export interface PolygonOptions extends FigureOptions {
  style?: FigureStyle
}

export interface PolygonStyle extends FigureStyle {}

export class Polygon extends Figure {
  path: Path
  points: Vector2[]

  constructor(options?: PolygonOptions) {
    options ??= {}
    super(options)
  }

  init(ck: CanvasKit): void {
    this.path = new ck.Path()
    for (const [index, point] of this.points.entries()) {
      if (index === 0) {
        this.path.moveTo(...point);
      } else {
        this.path.lineTo(...point);
      }
    }
    this.strokePaint.setStyle(ck.PaintStyle.Stroke)
    this.fillPaint.setStyle(ck.PaintStyle.Fill)
  }

  predraw(ck: CanvasKit, propertyChanged: string): void {
    switch (propertyChanged) {
      case 'points': {
        this.path.moveTo(0, 0)
        for (const [index, point] of this.points.entries()) {
          if (index === 0) {
            this.path.moveTo(...point);
          } else {
            this.path.lineTo(...point);
          }
        }
        break
      }
      case 'style.borderColor': {
        this.strokePaint.setColor(this.style.borderColor.toFloat4())
        break
      }
      case 'style.borderWidth': {
        this.strokePaint.setStrokeWidth(this.style.borderWidth)
        break
      }
      case 'style.fillColor': {
        this.fillPaint.setColor(this.style.fillColor.toFloat4())
        break
      }
    }
  }

  draw(canvas: Canvas): void {
    if (this.style.border) {
      canvas.drawPath(this.path, this.strokePaint)
    } if (this.style.fill) {
      canvas.drawPath(this.path, this.fillPaint)
    }
  }
}