import Resource from "./Resource.js";

export default class ResourceManager {
    async load() {
        let promises: Promise<void>[] = [];
        for (const [key, value] of Object.entries(this)) {
            if (value instanceof Resource)
                promises.push(value.load());
        }
        await Promise.all(promises);
    }
}