import { Shape, Sprite } from "../../dist/index.js";
import { Game } from "../script.js";
import { Entity } from "./Entity.js"

export class Spear extends Entity {
    /**
     * 
     * @param {Game} game 
     */
    constructor(game) {
        super(game, new Sprite(game.resources.spear), new Shape(5, 10));
    }
}