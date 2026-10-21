import { Resource } from "./Resource.js";

export class Font extends Resource<FontFace> {
   
    name: string;
    #url: string;

    constructor(name: string, url: string, autoLoad = true) {
        super();
        this.name = name;
        this.#url = url;
        if (autoLoad)
            this.loadAsync();
    }

    async loadAsync() {
        if (this.loading)
            return this.waitForLoad();
        this.loading = true;
        this.data = new FontFace(this.name, this.#url);
        await this.data.load();
        this.onload();
    }
}