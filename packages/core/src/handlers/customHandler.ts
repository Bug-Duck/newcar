import { defineHandler } from "../handler";

export const customHandler = defineHandler((callback: () => any) => callback());
