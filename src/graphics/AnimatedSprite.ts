import { Timer, Vector } from "../core/index.js";
import type { Texture } from "../resources/index.js";
import { Sprite } from "./Sprite.js";
import { SpriteAnimation } from "./SpriteAnimation.js";


export class AnimatedSprite extends Sprite {
    
    readonly columns;
    readonly rows;
    currentAnimation: SpriteAnimation|null = null;
    
    override get width() { return super.width / this.columns; }
    override get height() { return super.height / this.rows; }
    get playing() { return this.#timer.enabled; }

    #animations = new Map<string, SpriteAnimation>();
    #timer = new Timer(0);

    constructor(texture: Texture, columns: number, rows: number);
    constructor(url: string, columns: number, rows: number);

    constructor(src: Texture|string, columns: number, rows: number) {
        super(src as Texture);
        this.columns = columns;
        this.rows = rows;
        this.#timer.tick.add(this.timerOntick.bind(this));
    }

    timerOntick() {
        if (this.currentAnimation != null)
            this.currentAnimation.currentFrame ++;
    }
    
    add(name: string, start: number, frameCount: number, fps: number, loop = false) {
        this.#animations.set(name, new SpriteAnimation(name, start, frameCount, fps, loop));
    }

    play(name: string) {
        this.currentAnimation = this.#animations.get(name) ?? null;
        if (this.currentAnimation != null) {
            this.#timer.interval = 1000 / this.currentAnimation.fps;
            this.#timer.start();
        }
    }

    pause() {
        this.#timer.stop();
    }

    update(deltaTime: number) {
        if (this.currentAnimation === null)
            return;
        this.#timer.update();
    }

    draw(ctx: CanvasRenderingContext2D, origin: Vector = Vector.zero): void {
        if (!this.texture.isLoaded() || this.currentAnimation === null)
            return;
        let globalFrame = this.currentAnimation.globalFrame;
        let position = new Vector(
            globalFrame % this.columns, Math.floor(globalFrame / this.columns)
        );
        position.multiply(new Vector(this.width, this.height));

        ctx.save();
        let drawPosition = this.position.added(origin);
        ctx.translate(drawPosition.x, drawPosition.y);
        ctx.rotate(this.angle * Math.PI / 180);
        let scaledSize = this.size.multiplied(this.scale);
        ctx.drawImage(
            this.texture.data,
            position.x, position.y,
            this.width, this.height, 
            -scaledSize.x / 2,
            -scaledSize.y / 2,
            scaledSize.x,
            scaledSize.y,
        );
        ctx.restore();
    }
}