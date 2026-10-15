import type GameTime from "../core/GameTime.js";
import Vector from "../core/Vector.js";
import { Circle } from "../index.js";
import type Shape from "../shapes/Shape.js";
import { CollisionType } from "./CollisionType.js";

export default class Collider {
    shape: Shape;
    collisionType: CollisionType = CollisionType.static;
    velocity = Vector.zero;

    get position() { return this.shape.position; }
    set position(value) { this.shape.position = value; }

    get angle() { return this.shape.angle; }
    set angle(value) { this.shape.angle = value; }

    constructor(shape: Shape) {
        this.shape = shape;
        this.shape.color = "red";
    }

    update(gameTime: GameTime) {
        this.position.add(this.velocity.multiplied(gameTime.deltaTime));
    }

    draw(ctx: CanvasRenderingContext2D) {
        this.shape.draw(ctx);
    }
}