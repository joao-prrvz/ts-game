import type GameTime from "../GameTime.js";
import Vector from "../Vector.js";
import Sprite from "./Sprite.js";
import SpriteAnimation from "./SpriteAnimation.js";
import type Texture from "./Texture.js";

export default class AnimatedSprite extends Sprite {
    
    readonly columns;
    readonly rows;
    currentAnimation: SpriteAnimation|null = null;
    
    override get width() { return super.width / this.columns; }
    override get height() { return super.height / this.rows; }

    #animations = new Map<string, SpriteAnimation>();
    constructor(texture: Texture, columns: number, rows: number);
    constructor(url: string, columns: number, rows: number);

    constructor(src: Texture|string, columns: number, rows: number) {
        super(src as Texture);
        this.columns = columns;
        this.rows = rows;
    }
    
    add(name: string, start: number, frameCount: number, fps: number, loop = false) {
        this.#animations.set(name, new SpriteAnimation(name, start, frameCount, fps, loop));
    }

    play(name: string) {
        this.currentAnimation = this.#animations.get(name) ?? null;
    }

    update(gameTime: GameTime) {
        if (this.currentAnimation === null)
            return;
        this.currentAnimation.currentFrame ++;
    }

    draw(ctx: CanvasRenderingContext2D, origin?: Vector): void {
        if (this.texture.data === null || this.currentAnimation === null)
            return;
        let globalFrame = this.currentAnimation.globalFrame;
        let position = new Vector(
            globalFrame % this.columns, globalFrame / this.columns
        );
        position.multiply(new Vector(this.width, this.height));
        ctx.drawImage(this.texture.data, position.x, position.y, 
            this.width, this.height,
            0, 0, this.width, this.height
        )
    }
}