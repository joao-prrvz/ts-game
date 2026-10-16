import { AnimatedSprite } from "../../dist/graphics/index.js";
import { Entity } from "./Entity.js";

export class Ghost extends Entity {
    /** @type {AnimatedSprite} */
    get sprite() { return super.sprite; }
    set sprite(value) { super.sprite = value; }

    constructor(game) {
        super(game, new AnimatedSprite(game.resources.ghost, 7, 2));
        this.sprite.add("idle", 0, 6, 8);
        this.sprite.play("idle");
    }

    update(deltaTime) {
        super.update(deltaTime);
        this.sprite.update(deltaTime);
    }
}