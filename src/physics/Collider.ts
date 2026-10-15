import { Vector }from "../core/index.js";
import type { Shape } from "../shapes/Shape.js";
import { CollisionTypes, type CollisionType }  from "./CollisionType.js";

export class Collider {
    shape: Shape;
    collisionType: CollisionType = CollisionTypes.static;
    velocity = Vector.zero;

    get position() { return this.shape.position; }
    set position(value) { this.shape.position = value; }

    get angle() { return this.shape.angle; }
    set angle(value) { this.shape.angle = value; }

    constructor(shape: Shape) {
        this.shape = shape;
        this.shape.color = "red";
    }

    update(deltaTime: number) {
        this.position.add(this.velocity.multiplied(deltaTime));
    }

    draw(ctx: CanvasRenderingContext2D) {
        this.shape.draw(ctx);
    }
}