import type { Enum } from "../core/Enum.js";

export const MouseButtons  = {
    left: 0,
    middle: 1,
    right: 2,
    browserBack: 3,
    browserForward: 4,
} as const;

export type MouseButton = Enum<typeof MouseButtons>;