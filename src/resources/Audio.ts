import { Resource } from "./Resource.js";


export class Audio extends Resource<AudioBuffer> {
    #url: string; 

    constructor(url: string, autoLoad = true) {
        super();
        this.#url = url;
        if (autoLoad)
            this.loadAsync();
    }
    
    async loadAsync() {
        if (this.loading)
            return this.waitForLoad();
        this.loading = true;
        let response = await fetch(this.#url);
        let buffer = await response.arrayBuffer();
        let audioContext = new AudioContext();
        this.data = await audioContext.decodeAudioData(buffer);
        this.onload();
    }
}