import { InputManager } from "./input/index.js";
import { Vector } from "./core/Vector.js";

export abstract class BaseGame {
    targetFps: number = 0;
    protected ctx: CanvasRenderingContext2D;

    get currentFps() { return this.#currentFps; }

    get size(): Readonly<Vector> { return new Vector(this.width, this.height); }

    get width() { return this.ctx.canvas.width; }
    set width(value) { this.ctx.canvas.width = value; }

    get height() { return this.ctx.canvas.height; }
    set height(value) { this.ctx.canvas.height = value; }

    #currentFps = 0;

    constructor(ctx: CanvasRenderingContext2D) {
        this.ctx = ctx;
        InputManager.initialize(ctx.canvas);
    }

    async start() {
        let now = performance.now();
        while (true) {
            let prev = now;
            let delay = this.#getFrameDelay(prev);
            let interval = this.targetFps != 0 ? 1000 / this.targetFps : 0;
            this.update(delay);
            this.draw(this.ctx);

            delay = this.#getFrameDelay(prev);
            if (delay < interval)
                await this.#sleep(interval - delay);
            else if (interval == 0)
                await this.#sleep(0);

            delay = this.#getFrameDelay(prev);
            this.#currentFps = 1000 / delay;
            now = performance.now();
        }
    }
    
    scaleUp() {
        let aspect = this.width / this.height;
        let canvas = this.ctx.canvas;
        canvas.style.aspectRatio = aspect.toString();
        canvas.style.width = `min(100vw, 100dvh * ${aspect})`; 
    }

    async #sleep(ms: number) {
        return new Promise<void>(resolve => setTimeout(resolve, ms));
    }

    update(deltaTime: number) {
        InputManager.update();
    }

    draw(ctx: CanvasRenderingContext2D) {
        ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    }

    #getFrameDelay(previousFrameTime: number) {
        return performance.now() - previousFrameTime;
    }
}