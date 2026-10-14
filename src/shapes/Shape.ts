import type IDrawable from "../core/IDrawable.js";
import Vector from "../core/Vector.js";

export type ShapeStyle = "stroke"|"fill";

export default abstract class Shape implements IDrawable {
    position = Vector.zero;
    color = "black";
    style: ShapeStyle = "stroke";
    
    abstract draw(ctx: CanvasRenderingContext2D, origin?: Vector): void;

    static drawCircle(ctx: CanvasRenderingContext2D, position: Vector, radius: number, style: ShapeStyle = "stroke", color: string = "black") {
        ctx.beginPath();
        ctx.arc(position.x, position.y, radius, 0, 360 * (Math.PI / 180));
        this.#drawStyle(ctx, style, color);
    }

    static drawRect(ctx: CanvasRenderingContext2D, x: number, y: number, width: number, height: number, style: ShapeStyle = "stroke", color: string = "black") {
        ctx.beginPath();
        ctx.rect(
            x - width / 2, y - width / 2,
            width, height
        );
        this.#drawStyle(ctx, style, color);
    }

    static drawRectPro(ctx: CanvasRenderingContext2D, position: Vector, size: Vector, style: ShapeStyle = "stroke", color: string = "black") {
        this.drawRect(ctx, position.x, position.y, size.x, size.y, style, color);
    }


    static #drawStyle(ctx: CanvasRenderingContext2D, style: ShapeStyle, color: string = "black") {
        switch(style) {
            case "fill": {
                let oldStyle = ctx.fillStyle;
                ctx.fillStyle = color; 
                ctx.fill();
                ctx.fillStyle = oldStyle;
                break;
            }
            case "stroke": {
                let oldStyle = ctx.strokeStyle;
                ctx.strokeStyle = color; 
                ctx.stroke();
                ctx.strokeStyle = oldStyle;
                break;
            }
            default: 
                throw new Error("Wrong shape style");
        }
    }
}