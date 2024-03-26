import type { Canvas, CanvasKit } from 'canvaskit-wasm'
import type { Widget } from '../widget'

export const initial = (widget: Widget, ck: CanvasKit, canvas: Canvas) => {
  widget.init(ck)
  widget.preupdate(ck ,"")
  for (const child of widget.children) {
    initial(child, ck, canvas)
  }
}
