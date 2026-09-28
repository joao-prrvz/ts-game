import Vector from "../Vector.js";
import type IDrawable from "./IDrawable.js";

export default class Texture implements IDrawable {
    data: ImageBitmap|null = null;

    constructor(url: string) {
        let image = new Image();
        image.addEventListener("load", () => this.#load(image));
        image.src = url;
    }

    draw(ctx: CanvasRenderingContext2D, origin: Vector = Vector.zero): void {
        if (this.data == null)
            return;
        ctx.beginPath();
        ctx.drawImage(this.data, origin.x, origin.y);
        ctx.closePath();
    }

    async #load(image: HTMLImageElement) {
        this.data = await createImageBitmap(image);
    }


}