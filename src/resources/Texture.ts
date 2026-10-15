import { Vector, type IDrawable } from "../core/index.js";
import { Resource } from "./Resource.js";


export class Texture extends Resource implements IDrawable {
    data: ImageBitmap|null = null;
    #url: string;

    constructor(url: string) {
        super();
        this.#url = url;
        this.load();
    }

    isLoaded(): this is { data: ImageBitmap } { 
        return this.data !== null; 
    }
    
    draw(ctx: CanvasRenderingContext2D, origin: Vector = Vector.zero): void {
        if (!this.isLoaded())
            return;
        ctx.drawImage(this.data, origin.x, origin.y);
    }

    async load() {
        return new Promise<void>((res) => {
            let image = new Image();
            image.addEventListener("load", async () =>{
                this.data = await createImageBitmap(image);
                res();
            });
            image.src = this.#url;
        });
    }
}