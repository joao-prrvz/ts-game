
export default class SpriteAnimation {
    readonly name: string;
    readonly start: number;
    readonly frameCount: number;
    readonly fps: number;
    readonly loop: boolean;
    currentFrame = 0;

    get globalFrame() { return this.currentFrame + this.start; }

    constructor(name: string, start: number, frameCount: number, fps: number, loop = false) {
        this.name = name;
        this.start = start;
        this.frameCount = frameCount;
        this.fps = fps;
        this.loop = loop;
    }
}