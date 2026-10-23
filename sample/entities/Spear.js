import { CollisionTypes, Rectangle, Sprite } from "../../dist/index.js";
import { Game } from "../script.js";
import { Entity } from "./Entity.js"

export class Spear extends Entity {
    /**
     * 
     * @param {Game} game 
     */
    constructor(game) {
        super(game, new Sprite(game.resources.spear), new Rectangle(10, 15));
        this.collisionType = CollisionTypes.transparent;
        this.bodyEnter.add(this.#onbodyenter, this);
    }

    #onbodyenter() {
        this.game.world.remove(this);
    }
}