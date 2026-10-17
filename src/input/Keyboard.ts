export class Keyboard {
    #keys = new Set<string>();
    #previousKeys: string[] = [];
    #currentKeys: string[] = [];

    constructor() {
        window.addEventListener("keydown", this.#onkeydown.bind(this));
        window.addEventListener("keyup", this.#onkeyup.bind(this));
    }

    update() {
        this.#previousKeys = this.#currentKeys;
        this.#currentKeys = [...this.#keys];
    }

    isDown(key: string, caseSensitive = false) {
        if (caseSensitive)
            return this.#currentKeys.includes(key);

        return this.#currentKeys.includes(key.toLowerCase()) 
            || this.#currentKeys.includes(key.toUpperCase())
    }

    isJustPressed(key: string, caseSensitive = false) {
        if (caseSensitive)
            return this.isDown(key, caseSensitive) && !this.#previousKeys.includes(key);
        return this.isDown(key, caseSensitive)
            && !this.#previousKeys.includes(key.toLowerCase()) 
            && !this.#previousKeys.includes(key.toLowerCase());
    }
    
    #onkeydown(e: KeyboardEvent) {
        this.#keys.add(e.key);
    }

    #onkeyup(e: KeyboardEvent) {
        this.#keys.delete(e.key)
    }
}