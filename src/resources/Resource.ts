import { EventHandler } from "../core/index.js";

export abstract class Resource<T>  {
    data : T|null = null;
    loading = false;
    readonly load = new EventHandler<Resource<T>>();

    abstract loadAsync(): Promise<void>;

    onload() {
        this.load.invoke(this);
    }

    isLoaded(): this is { data: ImageBitmap } { 
        return this.data !== null; 
    }

    protected waitForLoad() {
        return new Promise<void>((res) => {
            let resolve = () => {
                res();
                this.load.remove(resolve);
            }
            this.load.add(resolve);
        })
    }
}