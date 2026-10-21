import { Vector, type IDrawable } from "../core/index.js";
import { Resource } from "./Resource.js";


export class Texture extends Resource<ImageBitmap> implements IDrawable {
    #url: string;

    constructor(url: string, autoLoad = true) {
        super();
        this.#url = url;
        if (autoLoad)
            this.loadAsync();
    }

    
    draw(ctx: CanvasRenderingContext2D, origin: Vector = Vector.zero): void {
        if (!this.isLoaded())
            return;
        ctx.drawImage(this.data, origin.x, origin.y);
    }

    async loadAsync() {
        if (this.loading) 
            return this.waitForLoad();
        return new Promise<void>((res) => {
            let image = new Image();
            image.addEventListener("load", async () =>{
                this.data = await createImageBitmap(image);
                this.onload();
                res();
            });
            image.src = this.#url;
        });
    }
}