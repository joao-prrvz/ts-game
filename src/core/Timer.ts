import { EventHandler } from "./EventHandler.js";

export class Timer {
    #lastFrame: number|null = null;
    interval: number;
    tick = new EventHandler<Timer>();
    enabled = false;

    constructor(interval: number) {
        this.interval = interval;
    }

    #ontick() {
        this.tick.invoke(this);
    }

    update() {
        if (!this.enabled)
            return;
        let now = performance.now();
        if (this.#lastFrame == null)
            this.#lastFrame = performance.now();
        if (now - this.#lastFrame > this.interval) {
            this.#lastFrame = now;
            this.#ontick();
        }
    }

    start() {
        this.enabled = true;
    }

    stop() {
        this.enabled = false;
    }
}