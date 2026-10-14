import { BaseGame, Circle, Collider, GameTime, InputManager, Shape, Sprite, Vector, World } from "../dist/index.js";
import Entity from "./Entity.js";
import Resources from "./Resources.js";

class Game extends BaseGame {
    world = new World();
    resources = new Resources();
    col = new Collider(new Circle(10));
    sprite = new Sprite(this.resources.face);

    constructor() {
        Vector.precision = 0;
        super(document.querySelector("canvas").getContext("2d"));
        this.ctx.imageSmoothingEnabled = false;
        this.ctx.lineWidth = 1;
        this.col.shape.color = "green";
        this.player = new Entity(this.sprite);
        this.world.add(this.player, this.col);
        this.col.position = this.size.divided(2);
        this.scaleUp();
        
    }

    /**
     * @param {GameTime} gameTime 
     */
    update(gameTime) {
        super.update();
        this.player.position = InputManager.mousePosition;
        this.player.shape.style = InputManager.mouseDown ? "fill" : "stroke";
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

new Game().start();