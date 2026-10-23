import { Vector, InputManager, Rectangle, AnimatedSprite, CollisionTypes } from "../../dist/index.js";
import { Game } from "../script.js";
import { Entity } from "./Entity.js";
import { Shield } from "./Shield.js";
import { Spear } from "./Spear.js";

export class Ghost extends Entity {

    hp = 3;

    /** @type {AnimatedSprite} */
    get sprite() { return super.sprite; }
    set sprite(value) { super.sprite = value; }

    /**
     * 
     * @param {Game} game 
     * @param {Vector} position 
     */
    constructor(game, position) {
        super(game, new AnimatedSprite(game.resources.ghost, 7, 2), new Rectangle(16));
        this.collisionType = CollisionTypes.transparent;
        this.sprite.add("idle", 0, 6, 8);
        this.sprite.play("idle");
        this.position = position;
        this.shield = new Shield(game);
        this.shield.position = this.position
            .subtracted(new Vector(0, this.shape.height));
        game.world.add(this.shield);
        this.bodyEnter.add(this.#onbodyenter, this);
    }

    #onbodyenter(sender, { collider }) {
        if (collider instanceof Spear) {
            this.game.world.remove(collider);
            this.hp --;
        }
    }

    update(deltaTime) {
        super.update(deltaTime);
        this.sprite.update(deltaTime);
        let keyboard = InputManager.keyboard;
        let direction = Vector.zero;
        let angle = 0;
        if (keyboard.isDown("w")) {
            direction = Vector.up;
            angle = 0;
        }
        else if (keyboard.isDown("a")) {
            direction = Vector.left;
            angle = -90;
        }
        else if (keyboard.isDown("s")) {
            direction = Vector.down;
            angle = 180;
        }
        else if (keyboard.isDown("d")) {
            direction = Vector.right;
            angle = 90;
        }

        if (!direction.equals(Vector.zero)) {
            this.shield.angle = angle;
            this.shield.position = this.position
                .added(direction.multiplied(this.shape.size));
        }
    }
}