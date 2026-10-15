import type { Vector } from "./Vector.js";

export interface IDrawable {
    draw(ctx: CanvasRenderingContext2D, origin?: Vector): void;
}