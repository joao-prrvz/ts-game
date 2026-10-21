import { EventHandler } from "../core/EventHandler.js";
import { Resource } from "./Resource.js";

export class ResourceManager {

    load = new EventHandler<ResourceManager>();

    async loadAsync() {
        let promises: Promise<void>[] = [];
        for (const [key, value] of Object.entries(this)) {
            if (value instanceof Resource)
                promises.push(value.loadAsync());
        }
        await Promise.all(promises);
        this.load.invoke(this);
    }
}