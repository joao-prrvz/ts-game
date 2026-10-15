import { Collider } from "../dist/physics/index.js";
import { Rectangle } from "../dist/shapes/index.js";

export class Entity extends Collider {

    /**
     * 
     * @param {Sprite} sprite 
     */
    constructor(sprite) {
        super(new Rectangle(32));
        this.sprite = sprite;
    }

    update(gameTime) {
        super.update(gameTime);
        this.sprite.position = this.position;
        this.sprite.angle = this.angle;
    }

    draw(ctx) {
        this.sprite.draw(ctx);
        super.draw(ctx);
    }
}