import { Widget } from './widget'

export interface Animation {
  act: (widget: Widget, elapsed: number, process: number) => void
}

export function defineAnimation(animation: Animation): Animation {
  return animation
}

export interface AnimationInstance {
  startAt: number
  during: number
  animation: Animation
}