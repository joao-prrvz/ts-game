
export class SpriteAnimation {
    readonly name: string;
    readonly start: number;
    readonly frameCount: number;
    readonly fps: number;
    readonly loop: boolean;
    
    get currentFrame() { return this.#currentFrame; }
    set currentFrame(value) { 
        if (value > this.frameCount)
            value = 0;
        this.#currentFrame = value;
    }

    get globalFrame() { return this.currentFrame + this.start; }

    #currentFrame = 0;

    constructor(name: string, start: number, frameCount: number, fps: number, loop = false) {
        this.name = name;
        this.start = start;
        this.frameCount = frameCount;
        this.fps = fps;
        this.loop = loop;
    }
}