import Vector from "../core/Vector.js";
import type IDrawable from "../core/IDrawable.js";
import Texture from "../resources/Texture.js";

export default class Sprite implements IDrawable {
    position = new Vector(0);
    texture: Texture;
    angle = 0;
    scale = new Vector(1);

    get width() { return this.texture.data?.width ?? 0; }
    get height() { return this.texture.data?.height ?? 0; }
    get size() { return new Vector(this.width, this.height); }

    constructor(texture: Texture);
    constructor(url: string);

    constructor(src: Texture|string) {
        this.texture = src instanceof Texture ? src : new Texture(src);
    }

    draw(ctx: CanvasRenderingContext2D, origin: Vector = Vector.zero): void {
        if (!this.texture.isLoaded())
            return;
        ctx.save();

        ctx.translate(this.position.x, this.position.y);
        ctx.rotate(this.angle * Math.PI / 180);
        let scaledSize = this.size.multiplied(this.scale);
        ctx.drawImage(
            this.texture.data,
            -scaledSize.x / 2,
            -scaledSize.y / 2,
            scaledSize.x,
            scaledSize.y
        );
        ctx.restore();
    }
}