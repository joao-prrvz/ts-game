import { EventHandler, Vector }from "../core/index.js";
import type { Shape } from "../shapes/index.js";
import { CollisionTypes, type CollisionType }  from "./CollisionType.js";

export class Collider {
    shape: Shape;
    collisionType: CollisionType = CollisionTypes.dynamic;
    bodyEnter = new EventHandler<Collider, { collider: Collider }>();
    bodyLeave = new EventHandler<Collider, { collider: Collider }>();
    velocity = Vector.zero;

    get position() { return this.shape.position; }
    set position(value) { this.shape.position = value; }

    get angle() { return this.shape.angle; }
    set angle(value) { this.shape.angle = value; }

    constructor(shape: Shape) {
        this.shape = shape;
        this.shape.color = "red";
    }
    
    onbodyenter(collider: Collider) {
        this.bodyEnter.invoke(this, {collider});
    }

    onbodyleave(collider: Collider) {
        this.bodyLeave.invoke(this, {collider});
    }

    update(deltaTime: number) {
        if (this.collisionType != CollisionTypes.static)
            this.position.add(this.velocity.multiplied(deltaTime));
    }

    draw(ctx: CanvasRenderingContext2D) {
        this.shape.draw(ctx);
    }
}