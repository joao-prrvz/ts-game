import { BaseGame } from "../dist/BaseGame.js";
import { Vector } from "../dist/core/index.js";
import { World, Collider } from "../dist/physics/index.js";
import { Resources } from "./Resources.js";
import { AnimatedSprite, Sprite } from "../dist/graphics/index.js";
import { Circle } from "../dist/shapes/index.js";
import { Entity } from "./entities/Entity.js";
import { InputManager } from "../dist/input/index.js";
import { Ghost } from "./entities/Ghost.js";


export class Game extends BaseGame {
    world = new World();
    resources = new Resources();

    constructor() {
        super(document.querySelector("canvas").getContext("2d"));
        this.ctx.imageSmoothingEnabled = false;
        this.ctx.lineWidth = 1;
        this.player = new Ghost(this);
        this.player.position = this.size.divided(2);
        this.world.add(this.player);
        this.scaleUp();
        
    }

    /**
     * @param {GameTime} gameTime 
     */
    update(gameTime) {
        super.update();
        this.player.shape.style = InputManager.mouse.down ? "fill" : "stroke";
        this.world.update(gameTime);
    }

    /**
     * @param {CanvasRenderingContext2D} ctx 
     */
    draw(ctx) {
        super.draw(ctx);
        this.world.draw(ctx);
    }

}

const game = new Game();
game.start();