import type { Handler } from "./handler";

export interface State {
  state: Map<number, Handler>;
}

export const defineState = (state: Map<number, Handler>): State => ({
  state,
});
