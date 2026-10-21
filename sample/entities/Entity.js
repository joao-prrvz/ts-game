import { Collider } from "../../dist/physics/index.js";
import { Circle, Rectangle, Shape } from "../../dist/shapes/index.js";
import { AnimatedSprite, Sprite } from "../../dist/graphics/index.js";
import { Game } from "../script.js";

export class Entity extends Collider {
    /**
     * 
     * @param {Game} game
     * @param {Sprite} sprite 
     * @param {Shape} shape
     */
    constructor(game, sprite, shape) {
        super(shape);
        this.game = game;
        this.sprite = sprite;
    }

    update(deltaTime) {
        super.update(deltaTime);
        this.sprite.angle = this.angle;
    }

    draw(ctx) {
        this.sprite.draw(ctx, this.position);
        super.draw(ctx);
    }
}