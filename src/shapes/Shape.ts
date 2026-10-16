import { Vector, type IDrawable } from "../core/index.js";
import type { DrawStyle } from "./DrawStyle.js";


export abstract class Shape implements IDrawable {
    color = "black";
    style: DrawStyle = "stroke";

    angle = 0;
    position = Vector.zero;
    
    abstract draw(ctx: CanvasRenderingContext2D, origin?: Vector): void;

    static drawCircle(ctx: CanvasRenderingContext2D, position: Vector, radius: number, style: DrawStyle = "stroke", color: string = "black") {
        ctx.beginPath();

        let old = {fill: ctx.fillStyle, stroke: ctx.strokeStyle};
        ctx.fillStyle = color; 
        ctx.strokeStyle = color;
        let pos = { x: Math.round(position.x), y: Math.round(position.y) };
        switch (style) {
            case "stroke": 
                this.#strokeCirce(ctx, pos, radius);
                break;
            case "fill":
                this.#fillCircle(ctx, pos, radius);
                break;
        }
        ctx.fillStyle = old.fill;
        ctx.strokeStyle = old.stroke;
    }



    static #strokeCirce(ctx: CanvasRenderingContext2D, position: {x: number, y:number}, radius: number) {
        let x = radius;
        let y = 0;
        let error = 1 - radius;

        while (x >= y) {
            ctx.fillRect(position.x + x, position.y + y, 1, 1);
            ctx.fillRect(position.x + y, position.y + x, 1, 1);
            ctx.fillRect(position.x - y, position.y + x, 1, 1);
            ctx.fillRect(position.x - x, position.y + y, 1, 1);
            ctx.fillRect(position.x - x, position.y - y, 1, 1);
            ctx.fillRect(position.x - y, position.y - x, 1, 1);
            ctx.fillRect(position.x + y, position.y - x, 1, 1);
            ctx.fillRect(position.x + x, position.y - y, 1, 1);

            y++;

            if (error < 0) {
                error += 2 * y + 1;
            } else {
                x--;
                error += 2 * (y - x) + 1;
            }
        }
    }



    static #fillCircle(ctx: CanvasRenderingContext2D, position: {x: number, y:number}, radius: number) {
        let x = radius;
        let y = 0;
        let error = 1 - radius;

        while (x >= y) {
            ctx.fillRect(position.x - x, position.y + y, x * 2 + 1, 1);
            ctx.fillRect(position.x - x, position.y - y, x * 2 + 1, 1);
            ctx.fillRect(position.x - y, position.y + x, y * 2 + 1, 1);
            ctx.fillRect(position.x - y, position.y - x, y * 2 + 1, 1);

            y++;

            if (error < 0) {
                error += 2 * y + 1;
            } else {
                x--;
                error += 2 * (y - x) + 1;
            }
        }
    }

    static drawRect(ctx: CanvasRenderingContext2D, x: number, y: number, width: number, height: number, angle: number = 0, style: DrawStyle = "stroke", color: string = "black") {
        ctx.beginPath();
        ctx.save();
        ctx.translate(Math.round(x), Math.round(y));
        ctx.rotate(angle / 180 * Math.PI);
        let offset = style == "stroke" ? 0.5 : 0; 
        ctx.rect(Math.round(-width / 2) + offset, Math.round(-height / 2) + offset, width - offset * 2, height - offset * 2);
        this.#drawStyle(ctx, style, color);
        ctx.restore();
    }

    static drawRectPro(ctx: CanvasRenderingContext2D, position: Vector, size: Vector, angle: number = 0, style: DrawStyle = "stroke", color: string = "black") {
        this.drawRect(ctx, position.x, position.y, size.x, size.y, angle, style, color);
    }

    static drawPolygon(ctx: CanvasRenderingContext2D, vertices: Vector[], triangles: number[], style: DrawStyle = "stroke", color: string = "black") {
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
            ctx.moveTo(Math.round(p0.x) + 0.5, Math.round(p0.y) + 0.5);
            ctx.lineTo(Math.round(p1.x) + 0.5, Math.round(p1.y) + 0.5);
            ctx.lineTo(Math.round(p2.x) + 0.5, Math.round(p2.y) + 0.5);
            ctx.closePath();

            this.#drawStyle(ctx, style, color);
        }
    }


    static #drawStyle(ctx: CanvasRenderingContext2D, style: DrawStyle, color: string) {
        let old = {fill: ctx.fillStyle, stroke: ctx.strokeStyle};
        ctx.fillStyle = color; 
        ctx.strokeStyle = color;
        switch(style) {
            case "fill": {
                ctx.fill();
                break;
            }
            case "stroke": {
                ctx.stroke();
                break;
            }
            default: 
                throw new Error("Wrong shape style");
        }
        ctx.fillStyle = old.fill;
        ctx.strokeStyle = old.stroke;
    }
}