type EventListener<T> = (sender: T) => void;

export class EventHandler<T> {
    #listeners: EventListener<T>[] = [];

    invoke(sender: T) {
        for (const listener of this.#listeners)
            listener(sender);
    }

    add(...items: EventListener<T>[]) {
        this.#listeners.push(...items);
    }

    remove(...items: EventListener<T>[]) {
        this.#listeners = this.#listeners.filter(l => !items.includes(l));
    }
}