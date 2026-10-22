type EventListener<T, U> = (sender: T, args: U) => void;

export class EventHandler<T, U = void> {
    #listeners = new Map<EventListener<T, U>, EventListener<T, U>>() ;

    invoke(sender: T, args: U) {
        for (const [key, listener] of this.#listeners)
            listener(sender, args);
    }

    add(listener: EventListener<T, U>, owner: object|null = null) {
        this.#listeners.set(listener, listener.bind(owner));
    }

    remove(item: EventListener<T, U>) {
        this.#listeners.delete(item);
    }
}