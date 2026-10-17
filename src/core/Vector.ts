import type { IDrawable } from "./IDrawable.js";
import type { IVector } from "./IVector.js";
import type { Transform } from "./Transform.js";

export class Vector implements IDrawable, IVector {
    #x!: number;
    #y!: number;

    static precision = 10;
    
    static get zero() { return new Vector(0); }
    static get up() { return new Vector(0, -1); }
    static get left() { return new Vector(-1, 0); }
    static get down() { return new Vector(0, 1); }
    static get right() { return new Vector(1, 0); }
    

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

    equals(vector: IVector) {
        return this.x == vector.x && this.y == vector.y;
    }

    add(value: IVector): void;
    add(value: number): void;

    add(value: IVector|number) {
        if (typeof(value) == "number") {
            this.x += value;
            this.y += value;
        }
        else {
            this.x += value.x;
            this.y += value.y;
        }
    }

    added(value: IVector): Vector;
    added(value: number): Vector;

    added(value: IVector|number) {
        let vector = this.clone();
        vector.add(value as IVector)
        return vector;
    }

    subtract(value: IVector): void;
    subtract(value: number): void;

    subtract(value: IVector|number) {
        if (typeof(value) == "number") {
            this.x -= value;
            this.y -= value;
        }
        else {
            this.x -= value.x;
            this.y -= value.y;
        }
    }

    subtracted(value: IVector): Vector;
    subtracted(value: number): Vector;

    subtracted(value: IVector|number) {
        let vector = this.clone();
        vector.subtract(value as IVector);
        return vector;
    }

    multiply(value: IVector): void;
    multiply(value: number): void;

    multiply(value: IVector|number) {
        if (typeof(value) == "number") {
            this.x *= value;
            this.y *= value;
        }
        else {
            this.x *= value.x;
            this.y *= value.y;
        }
    }

    multiplied(value: IVector): Vector;
    multiplied(value: number): Vector;

    multiplied(value: IVector|number) {
        let vector = this.clone();
        vector.multiply(value as IVector);
        return vector;   
    }

    divide(value: IVector): void;
    divide(value: number): void;

    divide(value: IVector|number) {
        if (typeof(value) == "number") {
            this.x /= value;
            this.y /= value;
        }
        else {
            this.x /= value.x;
            this.y /= value.y;
        }
    }

    divided(value: IVector): Vector;
    divided(value: number): Vector;

    divided(value: IVector|number) {
        let vector = this.clone();
        vector.divide(value as IVector);
        return vector;   
    }

    normalize() {
        const len = this.length;
        if (len !== 0) {
            this.x /= len;
            this.y /= len;
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
    
    distance(vector: IVector) {
        return this.subtracted(vector).length;
    }

    dot(vector: IVector) {
        return this.x * vector.x + this.y * vector.y;
    }

    cross(vector: IVector) {
        return this.x * vector.y - this.y * vector.x;
    }

    
}