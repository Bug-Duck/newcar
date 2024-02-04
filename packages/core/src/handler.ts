export interface Handler {
  handle: (...arg: any[]) => any;
}

export const defineHandler = (handleFn: (...arg: any[]) => any): Handler => ({
  handle: handleFn,
});
