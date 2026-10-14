import { Circle, Collider, Rectangle, Sprite } from "../dist/index.js";

export default class Entity extends Collider {

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
    }

    draw(ctx) {
        this.sprite.draw(ctx);
        super.draw(ctx);
    }
}