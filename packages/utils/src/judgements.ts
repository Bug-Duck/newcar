export function createCanvas(w?: number, h?: number): HTMLCanvasElement {
  const el = document.createElement('canvas')
  if (w != null)
    el.width = w
  if (h != null)
    el.height = h
  return el
}

export function isNull(v: unknown): v is void {
  return v == void 0
}

export function isUndefined(v: unknown): v is void {
  return typeof v === 'undefined'
}

export function isEqual(a: unknown, b: unknown): boolean {
  return Object.is(a, b)
}

export function isString(v: unknown): v is void {
  return typeof v === 'string'
}

export function isAsyncFunction(func: (...parameters: any[]) => any) {
  return func.constructor.name === 'AsyncFunction'
}

export function isObject(item: any): boolean {
  return (item && typeof item === 'object' && !Array.isArray(item))
}
