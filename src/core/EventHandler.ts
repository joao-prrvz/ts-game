type EventListener<T, U> = (sender: T, args: U) => void;

export class EventHandler<T, U = void> {
    #listeners: EventListener<T, U>[] = [];

    invoke(sender: T, args: U) {
        for (const listener of this.#listeners)
            listener(sender, args);
    }

    add(...items: EventListener<T, U>[]) {
        this.#listeners.push(...items);
    }

    remove(...items: EventListener<T, U>[]) {
        this.#listeners = this.#listeners.filter(l => !items.includes(l));
    }
}