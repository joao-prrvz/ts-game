import Vector from "../Vector.js";

export default interface IDrawable {
    draw(ctx: CanvasRenderingContext2D, origin?: Vector): void;
}