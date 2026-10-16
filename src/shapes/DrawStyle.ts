import type { Enum } from "../core/index.js";

export const DrawStyles = {
    stroke: "stroke",
    fill: "fill",
} as const;

export type DrawStyle = Enum<typeof DrawStyles>;