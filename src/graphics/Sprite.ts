import Vector from "../Vector.js";
import type IDrawable from "./IDrawable.js";
import Texture from "./Texture.js";

export default class Sprite implements IDrawable {
    position = new Vector(0);
    texture: Texture;

    get width() { return this.texture.data!.width; }
    get height() { return this.texture.data!.height; }

    constructor(texture: Texture);
    constructor(url: string);

    constructor(src: Texture|string) {
        this.texture = src instanceof Texture ? src : new Texture(src);
    }

    draw(ctx: CanvasRenderingContext2D, origin: Vector = Vector.zero): void {
        this.texture.draw(ctx, this.position.added(origin));                                                                                                                                                  
    }


}