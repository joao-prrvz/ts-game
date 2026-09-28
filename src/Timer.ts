import EventHandler from "./EventHandler.js";
import GameTime from "./GameTime.js";

export default class Timer {
    #lastFrame: number|null = null;
    interval: number;
    tick = new EventHandler<Timer>();

    constructor(interval: number) {
        this.interval = interval;
    }

    #ontick() {
        this.tick.invoke(this);
    }

    update(gameTime: GameTime) {
        let now = gameTime.totalTime;
        if (this.#lastFrame == null)
            this.#lastFrame = gameTime.totalTime;
        if (now - this.#lastFrame > this.interval) {
            this.#lastFrame = now;
            this.#ontick();
        }
    }
    
}