import GameTime from "./GameTime.js";

export default abstract class BaseGame {
    protected ctx: CanvasRenderingContext2D;

    constructor(ctx: CanvasRenderingContext2D) {
        this.ctx = ctx;
    }

    start(totalTime: number = 0) {
        this.update(new GameTime(totalTime));
        this.draw();
        requestAnimationFrame(this.start.bind(this));
    }

    abstract update(gameTime: GameTime): void;
    draw() {
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    }
}