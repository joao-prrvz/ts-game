export class ObjectManager<T> {
    protected items = new Set<T>();
    #itemsToRemove = new Set<T>();
    #itemsToAdd = new Set<T>();

    add(...items: T[]) {
        for (const item of items) {
            this.#itemsToAdd.add(item);
            this.#itemsToRemove.delete(item);
        }
    }

    remove(...items: T[]) {
        for (const item of items) {
            this.#itemsToRemove.add(item);
            this.#itemsToAdd.delete(item);
        }
    }

    update(deltaTime: number) {
        for (const item of this.#itemsToAdd)
            this.items.add(item);
        this.#itemsToAdd.clear();
        for (const item of this.#itemsToRemove)
            this.items.delete(item);
        this.#itemsToRemove.clear();
    }
}