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

    isDown(key: string) {
        return this.#currentKeys.includes(key);
    }

    isJustPressed(key: string) {
        return this.isDown(key) && !this.#previousKeys.includes(key);
    }
    
    #onkeydown(e: KeyboardEvent) {
        this.#keys.add(e.key);
    }

    #onkeyup(e: KeyboardEvent) {
        this.#keys.delete(e.key)
    }
}