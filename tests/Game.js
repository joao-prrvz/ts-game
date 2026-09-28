import { AnimatedSprite, BaseGame, Sprite, Timer, Vector } from "../dist/index.js";
let sprite = new AnimatedSprite("./assets/ghost.png", 7, 2);
sprite.add("idle", 0, 6, 8, true);
sprite.play("idle");
export default class Game extends BaseGame {
    timer = new Timer(1000);
    constructor() {
        super(document.querySelector("canvas").getContext("2d"));
        this.timer.tick.add(this.timerOnTick.bind(this));
    }

    timerOnTick(sender) {
        console.log("Hello");
    }

    /**
     * @param {GameTime} gameTime 
     */
    update(gameTime){
        this.timer.update(gameTime);
        sprite.update(gameTime);
    }


    draw() {
        super.draw();
        this.ctx.beginPath();
        this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
        this.ctx.closePath();
        sprite.draw(this.ctx);
    }
}