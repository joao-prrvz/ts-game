import Vector from "../core/Vector.js";
import Shape, { type ShapeStyle } from "./Shape.js";

export default class Circle extends Shape {
    
    radius: number;

    constructor(radius: number) {
        super();
        this.radius = radius;
    }

    draw(ctx: CanvasRenderingContext2D, origin?: Vector): void;
    draw(ctx: CanvasRenderingContext2D, style: ShapeStyle, origin?: Vector): void;
    draw(ctx: CanvasRenderingContext2D, style: ShapeStyle, color: string, origin?: Vector): void;

    draw(ctx: CanvasRenderingContext2D, p1: Vector|ShapeStyle = Vector.zero, p2?: Vector|string, p3?: Vector): void {
        // ctx.beginPath();
        let origin = p1 instanceof Vector 
        ? p1 : p2 instanceof Vector 
        ? p2 : p3 ?? Vector.zero;

        let drawPositon = this.position.added(origin);
        // ctx.arc(drawPositon.x, drawPositon.y, this.radius, 0, 360 * (Math.PI / 180));
        let style = typeof(p1) == "string" ? p1 : "stroke";
        let color = typeof(p2) == "string" ? p2 : "black";

        // this.#drawStyle(ctx, style);
        Shape.drawCircle(ctx, drawPositon, this.radius, style, color);
    }

}