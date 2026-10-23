import { Sprite } from "../../dist/graphics/index.js";
import { CollisionTypes } from "../../dist/physics/CollisionType.js";
import { Rectangle } from "../../dist/shapes/index.js";
import { Game } from "../script.js";
import { Entity } from "./Entity.js";
import { Spear } from "./Spear.js";

export class Shield extends Entity {

    /**
     * 
     * @param {Game} game 
     */
    constructor(game) {
        super(game, new Sprite(game.resources.shield), new Rectangle(25, 5));
        this.collisionType = CollisionTypes.transparent;
        this.bodyEnter.add(this.#onbodyenter, this);
    }

    #onbodyenter(sender, { collider }) {
        if (collider instanceof Spear) {
            this.game.score ++;
        }
    }
}