import { Resource } from "./Resource.js";


export class Audio extends Resource {
    data: AudioBuffer|null = null;
    #loading = false;
    #url: string; 
    constructor(url: string) {
        super();
        this.#url = url;
    }

    isLoaded(): this is { data: AudioBuffer } { 
        return this.data !== null; 
    }
    
    async load() {
        if (this.#loading)
            return;
        this.#loading = true;
        let response = await fetch(this.#url);
        let buffer = await response.arrayBuffer();
        let audioContext = new AudioContext();
        this.data = await audioContext.decodeAudioData(buffer);
    }
}