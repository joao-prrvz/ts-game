import type IDrawable from "./IDrawable.js";

export default class Vector implements IDrawable {
    #x!: number;
    #y!: number;

    static precision = 15;
    static get zero() { return new Vector(0); }

    get x() { return this.#x; }
    set x(value) { this.#x = this.#round(value); }
    
    get y() { return this.#y; }
    set y(value) { this.#y = this.#round(value); }

    get length() { return Math.sqrt(this.x ** 2 + this.y ** 2); }
    
    get angle() {
        let arctan = Math.tanh(this.y / this.x);
        if (this.x > 0 && this.y > 0)
            return arctan;
        if (this.x < 0 && (this.y > 0 || this.y < 0))
            return arctan + 180;
        if (this.x > 0 && this.y < 0)
            return arctan + 360;
        if (this.y > 0 && this.x == 0)
            return 90;
        if (this.y < 0 && this.x == 0)
            return 270;
        return 0;
    }

    constructor(value: number);
    constructor(x: number, y:number);
    
    constructor(p1: number, p2?: number) {
        this.x = p1;
        this.y = p2 ?? p1;
    }

    #round(value: number) {
        let precision = 10 ** Vector.precision;
        return Math.round(value * precision) / precision;
    }


    draw(ctx: CanvasRenderingContext2D, origin: Vector = Vector.zero): void {
        ctx.beginPath();
        ctx.strokeStyle = "green";
        ctx.moveTo(origin.x, origin.y);
        ctx.lineTo(this.x + origin.x, this.y + origin.y);
        ctx.stroke();
        ctx.strokeStyle = "black";
        ctx.closePath();
    }

    clone() {
        return new Vector(this.x, this.y);
    }

    toString() {
        return `Vector(${this.x}, ${this.y})`;
    } 

    add(value: Vector): void;
    add(value: number): void;

    add(value: Vector|number) {
        if (value instanceof Vector) {
            this.x += value.x;
            this.y += value.y;
        }
        else {
            this.x += value;
            this.y += value;
        }
    }

    added(value: Vector): Vector;
    added(value: number): Vector;

    added(value: Vector|number) {
        let vector = this.clone();
        vector.add(value as Vector)
        return vector;
    }

    subtract(value: Vector): void;
    subtract(value: number): void;

    subtract(value: Vector|number) {
        if (value instanceof Vector) {
            this.x -= value.x;
            this.y -= value.y;
        }
        else {
            this.x -= value;
            this.y -= value;
        }
    }

    subtracted(value: Vector): Vector;
    subtracted(value: number): Vector;

    subtracted(value: Vector|number) {
        let vector = this.clone();
        vector.subtract(value as Vector);
        return vector;
    }

    multiply(value: Vector): void;
    multiply(value: number): void;

    multiply(value: Vector|number) {
        if (value instanceof Vector) {
            this.x *= value.x;
            this.y *= value.y;
        }
        else {
            this.x *= value;
            this.y *= value;
        }
    }

    multiplied(value: Vector): Vector;
    multiplied(value: number): Vector;

    multiplied(value: Vector|number) {
        let vector = this.clone();
        vector.multiply(value as Vector);
        return vector;   
    }

    divide(value: Vector): void;
    divide(value: number): void;

    divide(value: Vector|number) {
        if (value instanceof Vector) {
            this.x /= value.x;
            this.y /= value.y;
        }
        else {
            this.x /= value;
            this.y /= value;
        }
    }

    divided(value: Vector): Vector;
    divided(value: number): Vector;

    divided(value: Vector|number) {
        let vector = this.clone();
        vector.divide(value as Vector);
        return vector;   
    }

    normalize() {
        if (this.length != 0) {
            this.x /= this.length;
            this.y /= this.length;
        }
    }

    normalized() {
        let vector = this.clone();
        vector.normalize();
        return vector;
    }
}