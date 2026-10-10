import Vector from "../core/Vector.js";
import type IDrawable from "../core/IDrawable.js";

export default class Texture implements IDrawable {
    data: ImageBitmap|null = null;

    
    constructor(url: string) {
        let image = new Image();
        image.addEventListener("load", () => this.#load(image));
        image.src = url;
    }
    isLoaded(): this is { data: ImageBitmap } { 
        return this.data !== null; 
    }
    
    draw(ctx: CanvasRenderingContext2D, origin: Vector = Vector.zero): void {
        if (!this.isLoaded())
            return;
        ctx.drawImage(this.data, origin.x, origin.y);
    }

    async #load(image: HTMLImageElement) {
        this.data = await createImageBitmap(image);
    }


}