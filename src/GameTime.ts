export default class GameTime {
    static #totalTime: number; 
    static #lastFrame: number|null = null;

    readonly totalTime: number;
    readonly deltaTime: number;

    constructor(totalTime: number) {
        if (GameTime.#lastFrame == null)
            GameTime.#lastFrame = totalTime;
        else
            GameTime.#lastFrame = GameTime.#totalTime;
        this.totalTime = totalTime;
        this.deltaTime = this.totalTime - GameTime.#lastFrame;
        GameTime.#totalTime = totalTime;
    } 
}