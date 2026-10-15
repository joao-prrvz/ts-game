import type { IDrawable } from "./IDrawable.js";
import type { Transform } from "./Transform.js";

export class Vector implements IDrawable {
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
        let radians = Math.atan2(this.y, this.x);
        let degrees = radians * (180 / Math.PI);
        return degrees < 0 ? degrees + 360 : degrees;
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

    equals(vector: Vector) {
        return this.x == vector.x && this.y == vector.y;
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

    transformed(tranform: Transform) {
        let rotationX = tranform.cos * this.x - tranform.sin * this.y;
        let rotationY = tranform.sin * this.x + tranform.cos * this.y;
        let translationX = rotationX + tranform.position.x;
        let translationY = rotationY + tranform.position.y;
        return new Vector(translationX, translationY);
    }
    
    distance(vector: Vector) {
        return this.subtracted(vector).length;
    }

    dot(vector: Vector) {
        return this.x * vector.x + this.y * vector.y;
    }

    cross(vector: Vector) {
        return this.x * vector.y - this.y * vector.x;
    }

    
}