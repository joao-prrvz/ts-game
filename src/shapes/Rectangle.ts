import { Vector } from "../core/index.js";
import { Polygon } from "./Polygon.js";
import { Shape } from "./Shape.js";

export class Rectangle extends Polygon  {
    
    size: Vector;
    get width() { return this.size.x; }
    set width(value) { this.size.x = value; }
    
    get height() { return this.size.y; }
    set height(value) { this.size.y = value; }

    constructor(size: Vector);
    constructor(size: number);
    constructor(width: number, height: number);

    constructor(p1: Vector|number, p2?: number) {
        super([], []);
        if (p1 instanceof Vector)
            this.size = p1;
        else {
            this.size = new Vector(p1);
            this.size.y = p2 ?? p1;
        }
        this.#createVertices();
        this.#createTriangle();
    }

    #createVertices() {
        let left = -this.width / 2;
        let right = -left;      
        let top = -this.height / 2;     
        let bottom = -top;

        this.vertices[0] = new Vector(left, top);
        this.vertices[1] = new Vector(right, top);
        this.vertices[2] = new Vector(right, bottom);
        this.vertices[3] = new Vector(left, bottom);
    }

    #createTriangle() {
        this.triangles[0] = 0
        this.triangles[1] = 1;
        this.triangles[2] = 2;
        this.triangles[3] = 0;
        this.triangles[4] = 2;
        this.triangles[5] = 3;
    }


    draw(ctx: CanvasRenderingContext2D, origin?: Vector): void;

    draw(ctx: CanvasRenderingContext2D, origin: Vector = Vector.zero): void {
        let drawPositon = this.position
            .added(origin);
        Shape.drawRectPro(ctx, drawPositon, this.size, this.angle, this.style, this.color);
    }
    
}