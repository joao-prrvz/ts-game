import { Vector, type IDrawable } from "../core/index.js";

export type ShapeStyle = "stroke"|"fill";

export abstract class Shape implements IDrawable {
    color = "black";
    style: ShapeStyle = "stroke";

    angle = 0;
    position = Vector.zero;
    
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

    static drawPolygon(ctx: CanvasRenderingContext2D, vertices: Vector[], triangles: number[], style: ShapeStyle = "stroke", color: string = "black") {
        for (let i = 0; i < triangles.length; i += 3) {

            // Get the three vertex indices for the current triangle
            const index0 = triangles[i]!;
            const index1 = triangles[i + 1]!;
            const index2 = triangles[i + 2]!;

            // Fetch the actual [x, y] coordinates from your vertices array
            const p0 = vertices[index0]!;
            const p1 = vertices[index1]!;
            const p2 = vertices[index2]!;

            ctx.beginPath();
            ctx.moveTo(p0.x, p0.y);
            ctx.lineTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.closePath();

            this.#drawStyle(ctx, style, color);
        }
    }


    static #drawStyle(ctx: CanvasRenderingContext2D, style: ShapeStyle, color: string) {
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