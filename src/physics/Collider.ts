import type GameTime from "../core/GameTime.js";
import Vector from "../core/Vector.js";
import { Circle } from "../index.js";
import type Shape from "../shapes/Shape.js";

export default class Collider {
    shape: Shape;
    velocity = Vector.zero;

    get position() { return this.shape.position; }
    set position(value) { this.shape.position = value; }


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