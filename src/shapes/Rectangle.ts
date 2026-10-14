import Vector from "../core/Vector.js";
import Shape, { type ShapeStyle } from "./Shape.js";

export default class Rectangle extends Shape  {
    
    size: Vector;
    get width() { return this.size.x; }
    set width(value) { this.size.x = value; }
    
    get height() { return this.size.y; }
    set height(value) { this.size.y = value; }

    constructor(size: Vector);
    constructor(size: number);
    constructor(width: number, height: number);

    constructor(p1: Vector|number, p2?: number) {
        super();
        if (p1 instanceof Vector)
            this.size = p1;
        else {
            this.size = new Vector(p1);
            this.size.y = p2 ?? p1;
        }
    }


    draw(ctx: CanvasRenderingContext2D, origin?: Vector): void;

    draw(ctx: CanvasRenderingContext2D, origin: Vector = Vector.zero): void {
        let drawPositon = this.position
            .added(origin);
        
        Shape.drawRectPro(ctx, drawPositon, this.size, this.style, this.color);
    }
    
}