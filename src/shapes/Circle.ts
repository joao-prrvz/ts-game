import Vector from "../core/Vector.js";
import Shape, { type ShapeStyle } from "./Shape.js";

export default class Circle extends Shape {
    
    radius: number;

    constructor(radius: number) {
        super();
        this.radius = radius;
    }

    draw(ctx: CanvasRenderingContext2D, origin?: Vector): void;
    draw(ctx: CanvasRenderingContext2D, origin: Vector = Vector.zero): void {
        let drawPositon = this.position.added(origin);
        Shape.drawCircle(ctx, drawPositon, this.radius, this.style, this.color);
    }

}