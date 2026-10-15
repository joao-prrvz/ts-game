import { Vector } from "./Vector.js";

export class Transform {
    position: Vector;
    sin: number;
    cos: number;

    static get zero() { return new Transform(0, 0, 0); }

    constructor(position: Vector, angle: number);
    constructor(x: number, y: number, angle: number);

    constructor(p1: Vector|number, p2: number, p3?: number) {
        this.position = p1 instanceof Vector 
        ? p1 : new Vector(p1, p2);
        let angle = p3 == undefined ? p2 : p3;
        this.sin = Math.sin(angle * (Math.PI / 180));
        this.cos = Math.cos(angle * (Math.PI / 180));
    }

}